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
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { requestBuilder } from '../requestBuilder';

export default function ItemFullView({ route, navigation }) {
  const { item } = route.params;
  return (
    <ScrollView>
      <Text>item</Text>
      {console.log(item)}
    </ScrollView>
  );
}

const style = StyleSheet.create({});
