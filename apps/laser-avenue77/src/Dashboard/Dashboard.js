import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  BackHandler,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import Icon from '@expo/vector-icons/Fontisto';
import Tasks from '../Dashboard/components/Tasks.js';
import Appointment from '../Dashboard/components/Appointments.js';
import Billing from '../Dashboard/components/Billing.js';
import AppointmentManager from '../Dashboard/components/AppointmentManager';
import { selectedHandler } from '../FinalLayout/store-finalLayout';
import { useFocusEffect } from '@react-navigation/native';
import {
  closeMenue,
  closeModalHandler,
  saveProviderId,
} from './store-dashboard';
import NotificationCarousel from './components/NotificationCarousel';
import BillingProvider from '../Dashboard/components/BillingProvider';
import AppointmentReceptionist from './components/AppointmentsReceptionist';
import AppontmentModal from './components/AdditionalAppontmentModal';
import FullViewApp from './components/FullViewApp';
import axios from 'axios';
import requestRebuilder from '../requestRebuilder  ';
import { dueDateHandler } from '../HR/store-Hr';
import ChangeStatusModal from './components/ChangeStatusModal';
import { Button } from 'native-base';

function Dashboard({ navigation }) {
  const dashboardStore = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [x, setx] = useState(500);
  const [announcemnt, setannouncemnt] = useState([
    { id: 1, announcemnt: 'Announcemt 1' },
    { id: 2, announcemnt: 'Announcemt 2' },
    { id: 3, announcemnt: 'Announcemt 3' },
    { id: 4, announcemnt: 'Announcemt 4' },
    { id: 5, announcemnt: 'Announcemt 5' },
    { id: 6, announcemnt: 'Announcemt 6' },
  ]);
  const translation = useRef(new Animated.Value(x)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translation, {
          toValue: x * -1,
          duration: 25000,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: x,
          duration: 25000,
          useNativeDriver: true,
        }),
      ])
    ).start(() => setx((prev) => prev * -1));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(dueDateHandler());
      createProviderId();
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go Exist the App?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );
  async function createProviderId() {
    console.log(
      'dashboardStore.userToken.userId',
      dashboardStore.userToken.userId
    );
    try {
      await axios(
        requestRebuilder('providers', '/providers', 'post', {
          userId: dashboardStore.userToken.userId,
        })
      ).then((results) => dispatch(saveProviderId(results.data[0].uuid)));
      console.log('inside tryyyyy');
    } catch (error) {
      console.log('inside error', error);
    }
  }
  function closeALLmodals() {
    dispatch(closeMenue());
    dispatch(closeModalHandler());
  }

  function deleteAnnounc(announc) {
    setannouncemnt(announcemnt.filter((i) => i.id !== announc.id));
  }
  return (
    <View style={{ paddingBottom: '6%' }}>
      <ScrollView>
        <Pressable onPress={() => closeALLmodals()}>
          <ImageBackground
            imageStyle={styles.image}
            style={styles.imgBackgRound}
            source={require('../assests/HeaderBackground.png')}
            resizeMode="cover"
          >
            <View style={styles.announcContainer}>
              <Animated.View
                style={[
                  styles.announcSweep,
                  { transform: [{ translateX: translation }] },
                ]}
              >
                {announcemnt.length > 0 &&
                  announcemnt.map((announc) => (
                    <Text style={styles.announcTxt}>
                      {announc.announcemnt}
                      {'   '}
                      <Icon
                        onPress={() => deleteAnnounc(announc)}
                        name="close"
                        style={{
                          fontSize: 15,
                        }}
                      />
                    </Text>
                  ))}
              </Animated.View>
            </View>
            <Tasks navigation={navigation} />
            <NotificationCarousel navigation={navigation} />
          </ImageBackground>
          {dashboardStore.userToken.profileType?.toLowerCase() == 'manager' && (
            <AppointmentManager navigation={navigation} />
          )}
          {dashboardStore.userToken.profileType?.toLowerCase() ==
            'provider' && <Appointment navigation={navigation} />}
          {dashboardStore.userToken.profileType?.toLowerCase() ==
            'receptionist' && (
            <AppointmentReceptionist navigation={navigation} />
          )}
          {dashboardStore.userToken.profileType?.toLowerCase() == 'manager' && (
            <Billing navigation={navigation} />
          )}
          {dashboardStore.userToken.profileType?.toLowerCase() ==
            'provider' && <BillingProvider navigation={navigation} />}
        </Pressable>
      </ScrollView>
      {dashboardStore.modalVisible && <AppontmentModal />}
      {dashboardStore.FullViewAppFlag && <FullViewApp />}
      <ChangeStatusModal />
    </View>
  );
}
const styles = StyleSheet.create({
  imgBackgRound: {
    borderBottomWidth: 0.3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 12 },
    shadowOpacity: 0.54,
    shadowRadius: 16.0,
    elevation: 24,
  },
  image: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  announcContainer: {
    width: '100%',
    height: '10%',
    flex: 1,
  },
  announcSweep: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  announcTxt: {
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
    borderRadius: 30,
    padding: 2,
    paddingHorizontal: 5,
    marginTop: 2,
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default Dashboard;
