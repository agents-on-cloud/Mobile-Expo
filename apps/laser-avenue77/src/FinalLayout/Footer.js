import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {
  settingsHandler,
  componentsLoaderHandler,
  selectedHandler,
} from './store-finalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { openCollaborateHandler } from '../FinalLayout/store-finalLayout';

function Layout() {
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function homeHandler() {
    dispatch(componentsLoaderHandler());

    navigation.navigate('Dashboard');
    dispatch(componentsLoaderHandler());
  }

  function CollaborateHandler() {
    // dispatch(openCollaborateHandler())
    navigation.navigate('BillingLandingPage');
  }
  return (
    <View
      style={{
        position: 'absolute',
        marginTop: 20,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 1,
      }}
    >
      <View>
        <TouchableOpacity style={styles.Homebutton} onPress={homeHandler}>
          <Icon name="home" style={styles.qrcodeIcon} />
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('libraryTest')}
            style={{
              width: 100,
              alignSelf: 'center',
              zIndex: 1,
            }}
          >
            <Image
              style={{
                width: '100%',
                height: 100,
                resizeMode: 'cover',
                shadowColor: '#000',
                alignSelf: 'center',
                marginLeft: '6%',
              }}
              source={require('../assests/qrImage.png')}
            />
          </TouchableOpacity>
          <View style={styles.QrBackGround}></View>
          <View style={styles.QrBack77}></View>
        </View>

        <TouchableOpacity
          style={styles.Collabratebutton}
          onPress={() => CollaborateHandler()}
        >
          <Icon name="wallet" style={styles.qrcodeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  QrBackGround: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: '36%',
    width: '29%',
    height: 50,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    zIndex: 100,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderColor: '#11567C',
  },
  QrBack77: {
    backgroundColor: '#F6FBF4',
    position: 'absolute',
    bottom: 0,
    width: '30%',
    height: 50,
    zIndex: 0,
    //opacity: 0.88,
    border: 10,
  },
  cameraIcon: {
    fontSize: 15,
    paddingLeft: 48,
  },
  qrcodeIcon: {
    color: 'teal',
    fontSize: 35,
    paddingLeft: 45,
    paddingTop: 10,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  QrButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    // borderTopRightRadius:60,
    position: 'absolute',
    bottom: 0,
    left: '35%',
    backgroundColor: '#DBD8E3',
    borderColor: '#11567C',
  },

  Collabratebutton: {
    width: '35%',
    height: 50,
    position: 'absolute',
    borderTopRightRadius: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#F6FBF4',
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderColor: '#11567C',
  },
  Homebutton: {
    zIndex: 100,
    borderTopLeftRadius: 30,
    width: '35%',
    height: 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#F6FBF4',
    borderColor: '#11567C',
    borderWidth: 0.2,
    borderRightWidth: 0,
    // shadowColor: "#000",
    //     shadowOffset: {
    //     width: 0,
    //     height: 12,
    //     },
    //     shadowOpacity: 0.58,
    //     shadowRadius: 16.00,

    //     elevation: 24,
  },
});

export default Layout;
