import React from "react";
import { Button, Actionsheet, useDisclose, Box, Text, Center, NativeBaseProvider } from "native-base";
// import { Path } from "react-native-svg";
import { useDispatch, useSelector } from 'react-redux';
import {onOpen,onClose} from '../store-notification'
import Icon from '@expo/vector-icons/Ionicons';


function Example() {
    const storeNotification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  return <Center>
      {/* <Button onPress={()=> dispatch(onOpen()) }>Actionsheet</Button> */}
      <Actionsheet isOpen={storeNotification.modalFlag} onClose={()=>(dispatch(onClose()))} size="full">
        <Actionsheet.Content>
          
          <Actionsheet.Item startIcon={<Icon  name="trash-sharp" />}>
            Delete
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="ios-share-social-outline"/>}>
            Share
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="play-circle"  />}>
            Play
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="md-star-outline" />}>
            Favourite
          </Actionsheet.Item> 
          {/* <Actionsheet.Item p={3} startIcon={<Icon color="trueGray.400" mr="1" h="24" w="24" viewBox="0 0 24 24" fill="none">
                <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
              </Icon>}> */}
            {/* Cancel */}
          {/* </Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    