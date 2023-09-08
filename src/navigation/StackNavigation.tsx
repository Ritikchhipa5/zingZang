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
import RecordScreen from '../screens/Home/Record/RecordScreen';
import SelectRecording from '../screens/Home/Record/SelectRecording';
import SongNameEdit from '../screens/Home/Record/SongNameEdit';
import LyricsPlayer from '../screens/Home/CustomLyrics/LyricsPlayer';
import CustomLyrics from '../screens/Home/CustomLyrics/CustomLyrics';
import AlbumCover from '../screens/Home/Record/AlbumCover';
import GenerateTrack from '../screens/Home/GenerateTrack/GenerateTrack';

function StackNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
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
      <Stack.Screen
        options={{headerShown: false}}
        name="CustomLyrics"
        component={CustomLyrics}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LyricsPlayer"
        component={LyricsPlayer}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectRecording"
        component={SelectRecording}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SongNameEdit"
        component={SongNameEdit}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AlbumCover"
        component={AlbumCover}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="GenerateTrack"
        component={GenerateTrack}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
