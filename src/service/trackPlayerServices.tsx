import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  State,
  PlaybackErrorEvent,
} from 'react-native-track-player';
// import {seekToCurrentTime} from './seekToCurrentTime';

export async function SetupPlayer() {
  let isSetup = false;
  try {
    let setup = await TrackPlayer.setupPlayer({
      // maxCacheSize: 5,
    });
    console.log(setup);
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },

      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      // progressUpdateEventInterval: 2,
    });
    isSetup = true;
    return isSetup;
  } catch (error) {
    console.log(error, 'sadmas');
    isSetup = false;
    return false;
  }
}

export async function addTracksOnTrackPlayer(tracks: any) {
  if (tracks) {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await TrackPlayer.setRepeatMode(RepeatMode.Track);
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
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    console.log('Event.RemoteDuck', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    console.log('Event.PlaybackState', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, event => {
    console.log('[Deprecated] Event.PlaybackMetadataReceived', event);
  });
}
