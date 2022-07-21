import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {
  Pressable,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Center,
  Avatar,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import requestRebuilder from '../../requestRebuilder  ';
import { componentsLoaderHandler } from '../../FinalLayout/store-finalLayout';
import { dueDateHandler } from '../../HR/store-Hr';
import { useFocusEffect } from '@react-navigation/native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LOCATION_TASK_NAME = 'geofencing-location-task';
function Hr({ navigation }) {
  const [test, setTest] = useState('');
  const [provider, setProviders] = useState([{}]);
  const [checkOutFlag, setCheckOutFlag] = useState(false);
  const [checkInFlag, setCheckInFlag] = useState(false);
  const [CheckInNew, setCheckInNew] = useState('');
  const [CheckOutNew, setCheckOutNew] = useState('____');
  const [today, setToday] = useState('');
  const tokenStore = useSelector((state) => state.dashboard);
  const hrStore = useSelector((state) => state.hrStore);
  const [coordinates, setCoordinates] = useState({});
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCuurentLocation();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');`
  //       return;
  //     }
  //     setInterval(async () => {
  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //       console.log('zzzzzzzzzzzzzzzzzzzz', location);
  //     }, 5000);
  //   })();
  // }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useFocusEffect(
    React.useCallback(() => {
      getCuurentLocation();
      dispatch(dueDateHandler());
      console.log('qqqqqqqq', hrStore.dueDate);
      console.log('rrrrrrrrr', tokenStore.providerId);
      DateAndTimeHandler();
      getData();
      checkinhHandler();
      requestPermissions();
    }, [])
  );

  async function getCuurentLocation() {
    console.log('1111111111');
    try {
      await Permissions.askAsync(Permissions.LOCATION);
      let location = await Location.getCurrentPositionAsync({}).then(
        (results) => console.log('aaaaaaaaaa', results)
      );
      if (location) {
        setCoordinates(location.coords);
      } else {
        location = await Location.getCurrentPositionAsync({});
        setCoordinates(location.coords);
      }
    } catch (error) {
      console.log('eeeeeeeeee', error);
    }
    // setInterval(async () => {

    // }, 5000);
  }

  // setInterval(async () => {
  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log('setCoordinatessetCoordinates', location);
  //   setCoordinates(location.coords);
  // }, 10000);

  const requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === 'granted') {
      const test = await Location.startGeofencingAsync(LOCATION_TASK_NAME, [
        region,
      ]);
    }
  };
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: any) => {
    const eventType: Location.LocationGeofencingEventType = data.eventType;
    const region: Location.LocationRegion = data.region;
    if (error) {
      return;
    }
    if (eventType === Location.LocationGeofencingEventType.Enter) {
    } else if (eventType === Location.LocationGeofencingEventType.Exit) {
    }
  });
  function DateAndTimeHandler() {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let d = new Date();
    var dayName = days[d.getDay()].toLocaleLowerCase();
    setToday(dayName);
    return `${d.getHours()}:${d.getMinutes()}`;
  }
  async function getData() {
    dispatch(componentsLoaderHandler());
    await axios(
      requestRebuilder('hr', '/getAllWorkingHours', 'post', {
        providerUuid: tokenStore.providerId,
        status: 'latest',
      })
    ).then((results) => setProviders(results.data));
    dispatch(componentsLoaderHandler());
  }
  async function checkinhHandler() {
    console.log('pppppp', hrStore.dueDate);
    await axios(
      requestRebuilder('hr', '/getAllTimeAttendance', 'post', {
        providerUuid: tokenStore.providerId,
        date: hrStore.dueDate,
      })
    ).then((results) => enableDisableHandler(results));
  }

  function enableDisableHandler(results) {
    // console.log('hrStore.dueDatehrStore.dueDate',hrStore.dueDate);
    // console.log('77777777777777777',results);

    setTest(results.data);
    if (results.data.length !== 0) {
      setCheckInNew(results.data[results.data.length - 1].checkIn);
      console.log(
        'CheckInNewCheckInNew',
        results.data[results.data.length - 1]
      );
      setCheckOutNew(results.data[results.data.length - 1].checkOut);
      console.log('yyyyypppppppppp');
      if (results.data[results.data.length - 1].checkOut == null) {
        setCheckOutFlag(false);
      } else {
        setCheckOutFlag(true);
      }
      if (results.data[results.data.length - 1].checkIn == null) {
        setCheckInFlag(false);
      } else {
        setCheckInFlag(true);
      }
    }
  }
  async function checkOutHandler() {
    let lat2 = 31.9713089;
    let lon2 = 35.8350942;
    if (
      haversine(coordinates.latitude, coordinates.longitude, lat2, lon2) *
        1000 <=
      50
    ) {
      setCheckOutNew(DateAndTimeHandler());
      setCheckOutFlag(true);
      await axios(
        requestRebuilder('hr', '/checkOutClicked', 'put', {
          providerUuid: tokenStore.providerId,
          status: 'out',
        })
      ).then((resp) => {
        console.log(resp, 'ssssssssssssssssssssssssssssssssss');
        setCheckOutNew(DateAndTimeHandler());
        setCheckOutFlag(true);
      });
    } else alert('please be sure to be in the establishment');
  }
  async function checkInHandler() {
    let lat2 = 31.9713089;
    let lon2 = 35.8350942;
    if (
      haversine(coordinates.latitude, coordinates.longitude, lat2, lon2) *
        1000 <=
      50
    ) {
      await axios(
        requestRebuilder('hr', '/checkInClicked', 'post', {
          providerUuid: tokenStore.providerId,
          providerName: tokenStore.userToken.name,
          ProviderId: tokenStore.userToken.userId,
          EmployeeId: tokenStore.userToken.id,
        })
      ).then((results) => {
        console.log(results, 'results');
        setCheckInNew(DateAndTimeHandler());
        setCheckInFlag(true);
      });
    } else alert('please be sure to be in the establishment');
  }

  function haversine(lat1, lon1, lat2, lon2) {
    // distance between latitudes
    // and longitudes
    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

    // convert to radiansa
    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;

    // apply formulae
    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6377.830272;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Center flex={1} px="3">
          <Pressable>
            {({ isHovered, isFocused }) => {
              return (
                <View>
                  <Box
                    mt="4"
                    maxW="96"
                    shadow={5}
                    pt="5"
                    pl="5"
                    pr="5"
                    rounded="8"
                  >
                    <HStack
                      space={10}
                      w="300"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        style={{ textAlign: 'center' }}
                        fontWeight="medium"
                        fontSize="xl"
                      >
                        DR{' '}
                        <Text>
                          {tokenStore.userToken.firstName.toUpperCase() +
                            ' ' +
                            tokenStore.userToken.lastName.toUpperCase()}
                        </Text>
                      </Text>
                      <Avatar
                        bg="cyan.500"
                        source={{
                          uri: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg',
                        }}
                      ></Avatar>
                    </HStack>

                    <HStack mt="6">
                      <Text
                        italic
                        mt="2"
                        fontSize="sm"
                        bold
                        style={{ color: 'teal' }}
                      >
                        {' '}
                        Check in/out:{' '}
                      </Text>
                      {!checkInFlag && (
                        <HStack>
                          <Text
                            pl="7"
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                          >
                            _____
                          </Text>
                          <Text
                            pl="5"
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                          >
                            to
                          </Text>
                          <Text
                            pl="7"
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                          >
                            _____
                          </Text>
                        </HStack>
                      )}
                      {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}

                      {checkInFlag && (
                        <HStack>
                          <Text
                            bold
                            style={{ color: 'teal' }}
                            pl="6"
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                          >
                            {CheckInNew}
                          </Text>
                          <Text
                            pl="5"
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                          >
                            to
                          </Text>
                          {CheckOutNew !== 'NaN:undefined' && (
                            <Text
                              bold
                              style={{ color: 'teal' }}
                              pl="6"
                              mt="2"
                              fontSize="sm"
                              color="coolGray.700"
                            >
                              {CheckOutNew}
                            </Text>
                          )}
                          {CheckOutNew == 'NaN:undefined' && (
                            <Text
                              bold
                              style={{ color: 'teal' }}
                              pl="6"
                              mt="2"
                              fontSize="sm"
                              color="coolGray.700"
                            >
                              _____
                            </Text>
                          )}
                        </HStack>
                      )}
                    </HStack>
                    {
                      <HStack
                        space={6}
                        pt="10"
                        w="300"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {
                          <Button
                            disabled={checkInFlag}
                            colorScheme={checkInFlag ? 'light' : 'primary'}
                            onPress={() => checkInHandler()}
                          >
                            Check in
                          </Button>
                        }
                        {
                          <Button
                            disabled={checkOutFlag}
                            colorScheme={checkOutFlag ? 'red' : 'blue'}
                            onPress={() => checkOutHandler()}
                          >
                            Check out
                          </Button>
                        }
                      </HStack>
                    }

                    <HStack alignContent={'center'} justifyContent={'center'}>
                      <Center>
                        <Text
                          italic
                          style={{ textAlign: 'center' }}
                          mt="5"
                          fontSize="sm"
                          color="coolGray.700"
                        >
                          {' '}
                          Working Hours
                        </Text>
                      </Center>
                    </HStack>
                    {provider.length !== 0 && (
                      <View>
                        {Object.entries(provider[0]).map((ee) => (
                          <HStack
                            pb="2"
                            style={{
                              backgroundColor:
                                today == ee[0].toLocaleLowerCase()
                                  ? '#B8F1B0'
                                  : 'transparent',
                              paddingBottom:
                                today == ee[0].toLocaleLowerCase() ? 15 : 2,
                              borderRadius:
                                today == ee[0].toLocaleLowerCase() ? 10 : 2,
                            }}
                          >
                            {ee[1].from && (
                              <HStack>
                                <Text
                                  pl="5"
                                  mt="5"
                                  fontSize="sm"
                                  color="coolGray.700"
                                >
                                  {ee[0].toUpperCase()}
                                </Text>
                                <Text
                                  style={{ position: 'absolute', left: 120 }}
                                  pl="5"
                                  mt="5"
                                  fontSize="sm"
                                >
                                  {ee[1].from}
                                </Text>
                                <Text
                                  style={{ position: 'absolute', left: 170 }}
                                  pl="5"
                                  mt="5"
                                  fontSize="sm"
                                >
                                  {' '}
                                  to
                                </Text>
                                <Text
                                  style={{ position: 'absolute', left: 220 }}
                                  pl="5"
                                  mt="5"
                                  fontSize="sm"
                                >
                                  {ee[1].to}
                                </Text>
                              </HStack>
                            )}
                          </HStack>
                        ))}
                      </View>
                    )}
                    <Flex>
                      {isFocused ? (
                        <Text
                          mt="2"
                          fontSize={12}
                          fontWeight="medium"
                          textDecorationLine="underline"
                          alignSelf="flex-start"
                        ></Text>
                      ) : (
                        <Text mt="2" fontSize={12} fontWeight="medium"></Text>
                      )}
                    </Flex>
                  </Box>
                </View>
              );
            }}
          </Pressable>
        </Center>
        <View style={{ marginTop: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default Hr;
