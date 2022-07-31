import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  LogBox,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Box,
  HStack,
  Spacer,
  Flex,
  Checkbox,
  Center,
  NativeBaseProvider,
  VStack,
  Spinner,
  Heading,
  Avatar,
  Divider,
  Button,
  PresenceTransition,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { requestBuilder } from '../requestBuilder';

export default function ProviderFullView({ route, navigation }) {
  const { item } = route.params;
  return (
    <ScrollView>
      <View style={style.header}>
        <Avatar
          mt="3"
          ml="2"
          size="60px"
          source={
            item.image
              ? { uri: item.image }
              : { uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png' }
          }
          style={{ margin: 10 }}
        />
        <Text style={{ fontSize: 18 }}>{item.label1}</Text>
      </View>
      <View>
        <View style={style.info}>
          <Text>{item.label4}: </Text>
          <Text>{item.value4}</Text>
        </View>

        <View style={style.info}>
          <Text>{item.label5}: </Text>
          <Text>{item.value5}</Text>
        </View>
        <View style={style.info}>
          <Text>{item.label6}: </Text>
          <Text>{item.value6}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
});
