import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Spinner,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginFlagHandler,
  closeloginFlagHandler,
  drawerHandler,
} from '../../FinalLayout/store-finalLayout';
import { saveToken, saveProviderId } from '../../Dashboard/store-dashboard';
import axios from 'axios';
import requestBuilder from '../../requestRebuilder  ';
import { useFocusEffect } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import requestRebuilder from '../../requestRebuilder  ';
const SignIn = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [userObj, setUserObj] = useState({
    username: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const finalLayoutStore = useSelector((state) => state.finalLayoutStore);
  const dashboardStore = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        // console.log('sssssssssssssssssss', token);
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // console.log('aaaaaaaaaaaaaa', token);
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(closeloginFlagHandler());
      setIsAuthenticated(false);
    }, [])
  );
  const signInAuthentication = async (results) => {
    console.log('resultsresults', results);
    if (results.data.accessToken) {
      try {
        dispatch(saveToken(results.data.accessToken));
        await axios(
          requestRebuilder('providers', '/providers', 'post', {
            userId: dashboardStore.userToken.userId,
          })
        ).then((results) => dispatch(saveProviderId(results.data[0].uuid)));
        console.log('inside iffffffff');
        dispatch(loginFlagHandler());
        navigation.navigate('Dashboard');
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      console.log('inside elseeeeeee');
      dispatch(closeloginFlagHandler());
      setLoader(false);
      setIsAuthenticated(true);
    }
  };
  const signInHandler = async () => {
    setLoader(true);
    try {
      await axios(requestBuilder('ciam', '/v1/signin', 'post', userObj))
        .then((results) => signInAuthentication(results))
        .then(() => dispatch(drawerHandler()));
    } catch (error) {
      dispatch(closeloginFlagHandler());
      setLoader(false);
      setIsAuthenticated(true);
    }
  };
  return (
    <NativeBaseProvider>
      {loader && (
        <Spinner
          mt="250"
          color="emerald.500"
          size="lg"
          accessibilityLabel="Loading posts"
        />
      )}
      {loader == false && (
        <Center flex={1} px="3" w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{ color: 'warmGray.50' }}
            >
              Laser Avenue
            </Heading>
            <Heading
              mt="1"
              _dark={{ color: 'warmGray.200' }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setUserObj({ ...userObj, username: value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setUserObj({ ...userObj, password: value })
                  }
                  type="password"
                />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: '#05595B',
                  }}
                  onPress={() => navigation.navigate('forgetPassword')}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>
              {isAuthenticated && (
                <FormControl.Label>
                  <Text style={{ textAlign: 'center', color: 'red' }}>
                    {' '}
                    The Email address or Password you entered is invalid{' '}
                  </Text>
                </FormControl.Label>
              )}
              <Button
                mt="2"
                style={{ backgroundColor: 'teal' }}
                onPress={() => signInHandler()}
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{ color: 'warmGray.200' }}
                >
                  I'm a new user.{' '}
                </Text>
                <Link
                  _text={{
                    color: '#05595B',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  onPress={() => navigation.navigate('SignUp')}
                >
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      )}
    </NativeBaseProvider>
  );
};
export default SignIn;
