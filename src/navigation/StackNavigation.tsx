import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home/Home';
import SignScreen from '../screens/Auth/SignScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import Register from '../screens/Auth/Register';
import TrackPlayer from '../screens/TrackPlayer';
import SongList from '../screens/SongList';
import SongPart from '../screens/SongPart';
import CreateProject from '../screens/Home/CreateProject';
import Setting from '../screens/Setting';
import MySongList from '../screens/MySongList';
import RecordScreen from '../screens/Home/RecordScreen';

function StackNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CreateProject"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateProject" component={CreateProject} />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignScreen"
        component={SignScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TrackPlayer"
        component={TrackPlayer}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SongList"
        component={SongList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SongPart"
        component={SongPart}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Setting"
        component={Setting}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MySongList"
        component={MySongList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RecordScreen"
        component={RecordScreen}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
