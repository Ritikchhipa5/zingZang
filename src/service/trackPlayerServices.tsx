import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  State,
} from 'react-native-track-player';
import {seekToCurrentTime} from './seekToCurrentTime';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer({
      minBuffer: 3,
    });
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

// export async function setupPlayer() {
//   let isSetup = false;
//   try {
//     await TrackPlayer.getCurrentTrack();
//     isSetup = true;
//   } catch {
//     await TrackPlayer.setupPlayer();
//     await TrackPlayer.updateOptions({
//       android: {
//         appKilledPlaybackBehavior:
//           AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
//       },
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//       ],
//       compactCapabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//       ],
//       progressUpdateEventInterval: 2,
//     });

//     await TrackPlayer.setRepeatMode(RepeatMode.Queue);
//     isSetup = true;
//   } finally {
//     // eslint-disable-next-line no-unsafe-finally
//     return isSetup;
//   }
// }

export async function addTracksOnTrackPlayer(tracks: any) {
  if (tracks) {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    // await seekToCurrentTime();
    // await TrackPlayer.play();
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('./../assets/sound/sound.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    },
  ]);
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // Add event listeners for remote control events (play, pause, next, etc.)
  // TrackPlayer.addEventListener(Event.RemotePlay, () => {
  //   TrackPlayer.play();
  // });
  // TrackPlayer.addEventListener(Event.RemotePause, () => {
  //   TrackPlayer.pause();
  // });
  // TrackPlayer.addEventListener(Event.RemoteNext, () => {
  //   TrackPlayer.skipToNext();
  // });
  // TrackPlayer.addEventListener(Event.RemotePrevious, () => {
  //   TrackPlayer.skipToPrevious();
  // });
}
