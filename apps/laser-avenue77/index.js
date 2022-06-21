import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import App from './src/App';
import {configureStore} from '@reduxjs/toolkit'
import billingReducer from './src/Billing/store-Billing'
import marketingReducer from './src/Marketing/store-marketing.js'
import tasksReducer from './src/Tasks/store-tasks.js'
import notificationReducer from './src/Notification/store-notification.js'
import providerReducer from './src/Provider/store-provider.js'
import appointmentReducer from './src/Appointment/store-Appointment.js'
import dashboardReducer from './src/Dashboard/store-dashboard.js'
import finalLayoutStore from "./src/FinalLayout/store-finalLayout.js"
import CiamStore from './src/CIAM/store-CIAM'
import hrStore from './src/HR/store-Hr.js'
import searchStore from './src/Search/search-store.js'
import { NativeBaseProvider,StatusBar,Box,HStack,Text} from "native-base";


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const store=configureStore({
    reducer:{
      billing:billingReducer,
      tasks:tasksReducer,
      notification:notificationReducer,
      provider:providerReducer,
      appointment:appointmentReducer,
      marketing:marketingReducer,
      dashboard:dashboardReducer,
      finalLayoutStore:finalLayoutStore,
      ciamStore:CiamStore,
      hrStore:hrStore,
      searchStore:searchStore
    }
  })
function main(params) {
    return(
        <Provider store={store} >
             <NativeBaseProvider>
        <App/>
        </NativeBaseProvider>
        </Provider>
    )
}
registerRootComponent(main);
