import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import type {
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import type {ReactElement} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {BlurView} from '@react-native-community/blur';
import {screenWidth} from '../../../utils/utils';
import {connect} from 'react-redux';
import {addRecording, removeRecording} from '../../../actions/record';
import StopRecordingModal from '../../../components/Modal/StopRecordingModal';
import {ICONS_SVG} from '../../../assets/svg/icons/Icon';
import LyricsData from '../../lyricsData.json';
import {addTracksOnTrackPlayer} from '../../../service/trackPlayerServices';
import {RecordingMusic} from '../../../service/lyricsService';
import TrackPlayer from 'react-native-track-player';
interface State {
  isRecording: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  countdown: number;
  isModalVisible: boolean;
  scaleValue: Animated.Value;
  opacity: Animated.Value;
  recordedAudios: Array<{
    uri: string;
    duration: number;
    time: string;
  }>;
}

const PULSE_DURATION = 250;
const COUNTDOWN_SECONDS = 3;
class RecordScreen extends Component<any, State> {
  //   private dirs = RNFetchBlob.fs.dirs;
  private path: any = '';

  private audioRecorderPlayer: AudioRecorderPlayer;
  private countdownInterval: NodeJS.Timeout | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      isRecording: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      countdown: -1,
      isModalVisible: false,
      scaleValue: new Animated.Value(0),
      opacity: new Animated.Value(1),
      recordedAudios: [],
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    // this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }

  componentDidMount(): void {
    addTracksOnTrackPlayer(RecordingMusic);
  }
  startPulseAnimation() {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0.5, // Fade out
          duration: PULSE_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1, // Fade in
          duration: PULSE_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.scaleValue, {
          toValue: 4, // Scale up
          duration: PULSE_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.scaleValue, {
          toValue: 1, // Scale down
          duration: PULSE_DURATION,
          useNativeDriver: false,
        }),
      ]),
      // {iterations: -1}, // Infinite loop
    );
  }

  startRecording = () => {
    this.startPulseAnimation().start();
    this.setState({countdown: COUNTDOWN_SECONDS});
    this.countdownInterval = setInterval(this.updateCountdown, 1000);
  };

  updateCountdown = () => {
    const {countdown} = this.state;
    if (countdown === 0) {
      clearInterval(this.countdownInterval!);
      this.setState({
        isRecording: true,
        countdown: -1,
        scaleValue: new Animated.Value(0),
        opacity: new Animated.Value(1),
      });
      this.startPulseAnimation().stop();
      this.onStartRecord();
      TrackPlayer.seekTo(0);
      TrackPlayer.play();
    } else {
      this.setState(prevState => ({
        countdown: prevState.countdown - 1,
      }));
    }
  };
  public render(): ReactElement {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }
    const {countdown, opacity, scaleValue, isRecording, isModalVisible} =
      this.state;
    return (
      <ImageBackground
        style={{height: heightPercentageToDP('100%')}}
        source={Images.BG_1}>
        {/* {isRecording && countdown > 0 && ( */}

        <>
          {countdown >= 0 && (
            <View
              className={`absolute z-[100] w-full h-full bg-black opacity-30`}
            />
          )}
          <Animated.View
            style={[
              styles.overlay,
              {opacity, transform: [{scale: scaleValue}]},
            ]}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </Animated.View>
        </>
        {/* )} */}
        <SafeAreaView className="justify-between flex-1 h-full ">
          {/* // Close Icons */}
          <View className="flex flex-row justify-end">
            {/* <View>
              <Image
                className="w-20 h-20 rounded-md rounded-lg"
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
                }}
              />
            </View> */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CreateProject');
                TrackPlayer.pause();
              }}
              className="right-0 px-5 ">
              <AntDesign name="close" color={'#fff'} size={28} />
            </TouchableOpacity>
          </View>
          <LyricsFlatList isRecording={isRecording} />

          {/* <View className="h-[20%] justify-center px-4">
            <View className="flex flex-row justify-center">
              <Entypo
                name="dots-three-horizontal"
                color={'#E174E4'}
                size={32}
              />
            </View>

            <KaraokeText lyrics={this.props.lyrics} isRecording={isRecording} />
          </View> */}

          <View className="px-5 ">
            <View className="h-1.5 bg-zinc-600" />
            <View className="mt-5">
              <View className="flex flex-row items-center justify-around ">
                <TouchableOpacity
                  // onPress={() => this.onStopRecord()}
                  className="flex items-center gap-2 ">
                  <View>
                    {/* <Image source={Images.LISTEN} className="w-[60] h-[60] " /> */}
                    <ICONS_SVG.LISTEN_SONG width={45} height={45} />
                  </View>
                  <Text className="text-sm font-bold text-white">
                    Listen Song
                  </Text>
                </TouchableOpacity>

                {/* //Record */}
                <TouchableOpacity
                  onPress={() => {
                    if (isRecording) {
                      this.handleStopRecordingModal();
                      TrackPlayer.pause();
                    } else {
                      this.startRecording();
                    }
                  }}
                  className="flex items-center gap-2 ">
                  <View>
                    {!isRecording ? (
                      <ICONS_SVG.RECORD width={50} height={50} />
                    ) : (
                      <ICONS_SVG.STOP width={50} height={50} />
                    )}
                  </View>

                  <Text className="text-sm font-bold text-white">
                    {isRecording ? 'Stop' : 'Record'}
                  </Text>
                </TouchableOpacity>
                {/* //save  */}
                <TouchableOpacity
                  className="flex items-center gap-2 "
                  onPress={() => {
                    this.startOver();
                  }}>
                  <View>
                    <ICONS_SVG.RELOAD width={45} height={45} />
                  </View>
                  <Text className="text-sm font-bold text-white">
                    Start Over
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <StopRecordingModal
          isVisible={isModalVisible}
          onResumeRecord={this.onResumeRecord}
          onPauseRecord={this.onPauseRecord}
          onStopRecord={this.onStopRecord}
          onEndRecording={this.handleEndRecordingModal}
        />
      </ImageBackground>
    );
  }

  private onStatusPress = (e: any): void => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);

    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  private onStartRecord = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    const timestamp = new Date().getTime();
    const filename = `recording_${timestamp}.m4a`;

    this.path = Platform.select({
      ios: 'file://' + RNFS.DocumentDirectoryPath + '/' + filename,
      android: undefined,
    });
    console.log(this.path);
    const uri = await this.audioRecorderPlayer.startRecorder(
      this.path,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      // console.log('record-back', e);

      clearInterval(this.countdownInterval!);
      // Animated.timing(this.state.opacity, {
      //   toValue: 0.0,
      //   duration: 1000,
      //   useNativeDriver: false,
      // }).start();

      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      console.log({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  private onPauseRecord = async (): Promise<void> => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      this.setState({
        isRecording: false,
      });
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  private onResumeRecord = async (): Promise<void> => {
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({
      isModalVisible: false,
      isRecording: true,
    });
    TrackPlayer.play();
  };

  private startOver = async () => {
    // Clear the recorded audios list
    this.setState({recordedAudios: [], recordSecs: 0, isRecording: false});
    await this.props.removeAllRecording();
    // You may also want to delete any saved audio files on the device
    // Implement logic to delete the audio files from storage here
  };
  private handleStopRecordingModal = () => {
    this.setState({
      isModalVisible: true,
    });
    this.onPauseRecord();
  };
  private handleEndRecordingModal = () => {
    this.setState({
      isModalVisible: false,
    });
    this.onStopRecord();
  };
  private onStopRecord = async (): Promise<void> => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    const recordedAudio = {
      uri: result,
      duration: this.state.recordSecs / 1000,
      time: new Date().toISOString(), // You can add a timestamp for reference
    };
    console.log(recordedAudio, 'Record');
    await this.props.addRecord({
      recordedAudios: recordedAudio,
    });
    this.audioRecorderPlayer.removeRecordBackListener();

    this.setState({
      recordSecs: 0,
      isRecording: false,
      isModalVisible: false,
    });
    // // Update the list of recorded audios
    this.setState((prevState: any) => ({
      recordedAudios: [...prevState.recordedAudios, recordedAudio],
      recordSecs: 0,
      isRecording: false,
    }));
    TrackPlayer.pause();
    this.props.navigation.navigate('SelectRecording');
  };

  private onStartPlay = async (): Promise<void> => {
    console.log('onStartPlay', this.path);

    try {
      const msg = await this.audioRecorderPlayer.startPlayer(this.path);

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await this.audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
        this.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };

  private onPausePlay = async (): Promise<void> => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onResumePlay = async (): Promise<void> => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  private onStopPlay = async (): Promise<void> => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 28,
    color: 'white',
  },
});

const mapStateToProps = (state: any) => {
  return {
    recordedAudios: state.records.recordedAudios,
    lyrics: state.records?.lyrics,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addRecord: (rec: any) => {
      dispatch(addRecording(rec));
    },

    removeAllRecording: () => {
      dispatch(removeRecording());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen);

function KaraokeText({lyrics, isRecording}: any) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setCurrentColorIndex(prevIndex =>
          prevIndex < lyrics.length - 1 ? prevIndex + 1 : prevIndex,
        );
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [lyrics, isRecording]);

  return (
    <>
      {lyrics.map((text: string, index: number) => (
        <Text
          key={index}
          className={`font-semibold text-center text-xl leading-7 ${
            index <= currentColorIndex ? 'text-[#E174E4]' : 'text-white'
          }`}>
          {text}
        </Text>
      ))}
    </>
  );
}

const LyricsFlatList = ({isRecording}: any) => {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setCurrentTime(currentTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTime, isRecording]);
  const flatListRef = useRef<any>(null);
  const lines = LyricsData.lyrics.lines;

  useEffect(() => {
    // You can use this effect to trigger play/pause based on your playback logic
    // Also, update the flat list to scroll to the current line of lyrics
    if (flatListRef.current && isRecording) {
      // Calculate the current line index based on the current time
      const currentIndex = lines.findIndex(
        (line, index) =>
          currentTime >= line.time &&
          (lines[index + 1] ? currentTime < lines[index + 1].time : true),
      );

      // Scroll to the current line with a smooth animation
      if (currentIndex >= 0 && currentIndex < lines.length) {
        // Scroll to the current line with a smooth animation
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }
    }
  }, [currentTime, isRecording]);
  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      className="relative h-full"
      data={lines}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        const startTime = item.time;
        const endTime = lines[lines.indexOf(item) + 1]
          ? lines[lines.indexOf(item) + 1].time
          : Infinity;

        // Conditionally set text color based on the current time
        const textColor =
          currentTime >= startTime && currentTime < endTime
            ? {color: 'white'}
            : {color: 'rgba(237, 236, 237, 0.30)', opacity: 10};

        return (
          <Text
            className="relative px-4 text-3xl font-bold "
            style={{
              paddingVertical: 20,

              ...textColor,
            }}>
            {item.words[0].string}
          </Text>
        );
      }}
    />
  );
};
