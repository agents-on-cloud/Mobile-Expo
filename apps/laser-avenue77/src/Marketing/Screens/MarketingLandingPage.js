import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Checkbox} from "native-base";
import { HStack } from "native-base";

function MarketingLandingPage({navigation}) {
    return (
      // <View>
     
<HStack space={3}>
      <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
      <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked />
    </HStack>

    // </View>
    );
  }
  export default MarketingLandingPage