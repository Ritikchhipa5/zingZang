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
import React, {Component} from 'react';

import type {ReactElement} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../constant/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {BlurView} from '@react-native-community/blur';
import {screenWidth} from '../../utils/utils';
interface State {
  isRecording: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  countdown: number;
  scaleValue: Animated.Value;
  opacity: Animated.Value;
}

const PULSE_DURATION = 250;
const COUNTDOWN_SECONDS = 3;
class Page extends Component<any, State> {
  //   private dirs = RNFetchBlob.fs.dirs;
  private path = Platform.select({
    ios: undefined,
    android: undefined,
  });

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
      scaleValue: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    // this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
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

  // componentDidMount() {
  //   this.startPulseAnimation();
  // }
  startRecording = () => {
    this.startPulseAnimation().start();
    this.setState({countdown: COUNTDOWN_SECONDS});
    this.countdownInterval = setInterval(this.updateCountdown, 1000);
  };

  // Update the countdown interval
  // updateCountdown = () => {
  //   this.setState(
  //     prevState => ({
  //       countdown: Math.max(prevState.countdown - 1, 0),
  //     }),
  //     () => {
  //       if (this.state.countdown === 0) {
  //         this.setState({
  //           isRecording: true,
  //           scaleValue: new Animated.Value(0),
  //           opacity: new Animated.Value(0),
  //         });
  //         this.startPulseAnimation().stop();
  //         this.onStartRecord();
  //       }
  //     },
  //   );
  // };

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
    const {countdown, opacity, scaleValue, isRecording} = this.state;
    return (
      <ImageBackground
        style={{height: heightPercentageToDP('100%')}}
        source={Images.BG_1}>
        {/* {isRecording && countdown > 0 && ( */}
        <>
          {countdown >= 0 && (
            <View
              className={`absolute z-10 w-full h-full bg-black opacity-30`}
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
        <SafeAreaView className="justify-between flex-1 h-full gap-10 ">
          {/* // Close Icons */}
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              // onPress={() => navigation.goBack(' ')}
              className="right-0 px-5 ">
              <AntDesign name="close" color={'#fff'} size={28} />
            </TouchableOpacity>
          </View>
          {/* // Wave view */}
          <View className="h-[20%] relative ">
            <View className="absolute z-10 w-[30%] h-full bg-[#190D1A99] " />
            <BlurView
              // style={styles.absolute}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <View className=" h-full bg-[#E174E420]" />
          </View>
          <View className="h-[20%] justify-center px-4">
            <View className="flex flex-row justify-center">
              <Entypo
                name="dots-three-horizontal"
                color={'#E174E4'}
                size={32}
              />
            </View>
            <Text className="text-[#E174E4] font-semibold text-center text-xl">
              of type RCTView has a shadow set but cannot calculate shadow
              efficiently. Consider setting a background color to fix this, or
              apply the shadow to a more specific component.
            </Text>
          </View>
          <View className="px-5 ">
            <View className="h-1.5 bg-zinc-600" />
            <View className="mt-5">
              <View className="flex flex-row justify-around ">
                <TouchableOpacity
                  onPress={() => this.onStopRecord()}
                  className="flex items-center ">
                  <View>
                    <Image source={Images.LISTEN} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-sm font-bold text-white">
                    Listen Song
                  </Text>
                </TouchableOpacity>

                {/* //Record */}
                <TouchableOpacity
                  onPress={() => {
                    if (isRecording) {
                      this.onStopRecord();
                    } else {
                      this.startRecording();
                    }
                  }}
                  className="flex items-center ">
                  <View>
                    <Image
                      source={isRecording ? Images.STOP : Images.REC}
                      className="w-[60] h-[60] "
                    />
                  </View>
                  <Text className="text-sm font-bold text-white">
                    {isRecording ? 'Stop' : 'Record'}
                  </Text>
                </TouchableOpacity>
                {/* //save  */}
                <TouchableOpacity className="flex items-center ">
                  <View>
                    <Image source={Images.SAVE} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-sm font-bold text-white">
                    Save Recording
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
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

    console.log('audioSet', audioSet);

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
  };

  private onStopRecord = async (): Promise<void> => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      isRecording: false,
    });
    console.log(result);
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
export default Page;
