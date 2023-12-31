import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignScreen from '../screens/Auth/SignScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import Register from '../screens/Auth/Register';
import TrackPlayer from '../screens/TrackPlayer';
import SongList from '../screens/SongList';
import SongPart from '../screens/SongPart';
import CreateProject from '../screens/Home/CreateProject';
import Setting from '../screens/Home/Settings/Setting';
import MySongList from '../screens/MySongList';
import RecordScreen from '../screens/Home/Record/RecordScreen';
import SelectRecording from '../screens/Home/Record/SelectRecording';
import SongNameEdit from '../screens/Home/Record/SongNameEdit';
import SelectPortion from '../screens/Home/Record/SelectPortion';
import LyricsPlayer from '../screens/Home/CustomLyrics/LyricsPlayer';
import CustomLyrics from '../screens/Home/CustomLyrics/CustomLyrics';
import AlbumCover from '../screens/Home/Record/AlbumCover';
import GenerateTrack from '../screens/Home/GenerateTrack/GenerateTrack';
import AlbumCoverPage from '../screens/Home/Record/AlbumCoverPage';
import Reels from '../screens/Home/VideoPost/VideoPost';
import VideoCoverPage from '../screens/Home/GenerateTrack/VideoCoverPage';
import GenerateSongList from '../screens/Home/GenerateTrack/GenerateSongList';
import {useSelector} from 'react-redux';
import GenerateReel from '../screens/Home/GenerateTrack/GenerateReel';
import AccountInfo from '../screens/Home/Settings/AccountInfo';
function StackNavigation() {
  const Stack = createStackNavigator();
  const isLoggedIn =
    useSelector((state: any) => state?.userData)?.user === null ? false : true;
  console.log(isLoggedIn);
  return (
    <Stack.Navigator
      initialRouteName="SignScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      {!isLoggedIn ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen name="CreateProject" component={CreateProject} />

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
            name="AccountInfo"
            component={AccountInfo}
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
            name="SelectPortion"
            component={SelectPortion}
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
          <Stack.Screen
            options={{headerShown: false}}
            name="GenerateSongList"
            component={GenerateSongList}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="VideoCoverPage"
            component={VideoCoverPage}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="GenerateReel"
            component={GenerateReel}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="AlbumCoverPage"
            component={AlbumCoverPage}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Reels"
            component={Reels}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigation;
