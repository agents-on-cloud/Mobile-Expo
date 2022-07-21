import React, { useRef, useEffect } from 'react';
import { Box, IconButton, PresenceTransition } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { isQuickActionsOpenHandler } from '../FinalLayout/store-finalLayout';
import { View, Text, StyleSheet, Animated } from 'react-native';

function QuickActions() {
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const labelsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(labelsOpacity, {
      toValue: 1,
      duration: 500,
      delay: 200,
    }).start();
  }, [layoutSore.isQuickActionsOpen]);

  return (
    <Box
      alignItems="center"
      style={{
        position: 'absolute',
        bottom: 120,
        right: 20,
        zIndex: layoutSore.isQuickActionsOpen ? 10 : 0,
      }}
    >
      <PresenceTransition
        visible={layoutSore.isQuickActionsOpen}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 200,
          },
        }}
      >
        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('HrProvider');
              dispatch(isQuickActionsOpenHandler());
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                name="account-multiple-check"
                style={{ fontSize: 30 }}
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Check In
          </Animated.Text>
        </View>
        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('createTask');
              dispatch(isQuickActionsOpenHandler());
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="table-large-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Create Task
          </Animated.Text>
        </View>

        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('calendar');
              dispatch(isQuickActionsOpenHandler());
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="red.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="calendar-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Calender
          </Animated.Text>
        </View>

        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('createNotification');
              dispatch(isQuickActionsOpenHandler());
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="orange.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="bell-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Create Notification
          </Animated.Text>
        </View>
      </PresenceTransition>
    </Box>
  );
}
const styles = StyleSheet.create({
  quickActions: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  actionsLabels: {
    padding: '1%',
    paddingHorizontal: '3%',
    marginBottom: '5%',
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
});

export default QuickActions;
