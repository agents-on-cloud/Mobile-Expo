import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform,TextInput  } from 'react-native';
import * as Calendar from 'expo-calendar';
import {Heading} from 'native-base'

export default function App() {
  const [text, onChangeText] = React.useState("");
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  
  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: text,
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
  
  
  

  return (
    <View >
    <View style={{flexDirection:'row',margin:25}}>
    <Heading style={{fontSize:14,marginRight:10}}>Calendar Name</Heading>
    <TextInput
    style={{width:'60%',height:40, borderWidth:1,borderColor:'teal',borderRadius:5,padding:5}}
    onChangeText={onChangeText}
    value={text}
    placeholder="Calendar Name"/>
    </View>
    <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

