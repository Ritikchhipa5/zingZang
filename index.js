/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {playbackService} from './src/service/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => playbackService);
