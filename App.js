
import 'react-native-gesture-handler';
import React from 'react';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { View, StyleSheet, Image, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';



const RootStack = createStackNavigator();

class App extends React.Component{
  render() {
     return(
   <NavigationContainer >
<RootStack.Navigator initialRouteName="Home">
<RootStack.Screen options={{headerShown: false}} name="Home" component={Home}/>
<RootStack.Screen options={{headerShown: false}} name="Detail" component={Detail}/>

{/* <RootStack.Screen  options={{
 headerLeft:null,
          title: 'Stores',
          headerRight: () => (<ActionImage/> ),
           headerStyle: {
             backgroundColor: '#FFFF',
           },
        }} name="NoStore" component={NoStore}/> */}
</RootStack.Navigator>
   </NavigationContainer>
  )
}
}



export default App;
