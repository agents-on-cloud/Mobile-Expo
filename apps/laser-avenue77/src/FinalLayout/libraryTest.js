import React,{useEffect} from "react";
import { Checkbox, Center, NativeBaseProvider } from "native-base";
import {Text} from 'react-native'

const Example = () => {
  const [groupValues, setGroupValues] = React.useState([]);
  useEffect(() => {
console.log('====================================');
console.log(groupValues);
console.log('====================================');
  }, [groupValues])
  function test(params) {
    
  }
  
  return <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
      <Checkbox value="one" my={2}>
        UX Research
      </Checkbox>
      <Checkbox value="two">Software Development</Checkbox>
    </Checkbox.Group>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
           
            </Center>
          </NativeBaseProvider>
        );
    };
    