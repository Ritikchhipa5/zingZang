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
  Dimensions,
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
interface State {
  isLoggingIn: boolean;
  isCounting: boolean;
  isRecording: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  countdown: number;
  opacity: Animated.Value;
}

const screenWidth = Dimensions.get('screen').width;

class Page extends Component<any, State> {
  //   private dirs = RNFetchBlob.fs.dirs;
  private path = Platform.select({
    ios: undefined,
    android: undefined,

    // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
    // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
    // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
    // ios: 'hello.m4a',
    // android: `${this.dirs.CacheDir}/hello.mp3`,
  });

  private audioRecorderPlayer: AudioRecorderPlayer;
  private countdownInterval: NodeJS.Timeout | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggingIn: false,
      isRecording: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      countdown: 3,
      isCounting: false,
      opacity: new Animated.Value(0),
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }
  startRecording = () => {
    this.setState({isRecording: true, opacity: new Animated.Value(1)});
    setInterval(this.updateCountdown, 1000);
  };

  updateCountdown = () => {
    this.setState(
      prevState => ({
        countdown: Math.max(prevState.countdown - 1, 0),
      }),
      () => {
        if (this.state.countdown === 0) {
          this.onStartRecord();
        }
      },
    );
  };

  public render(): ReactElement {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }
    const {countdown, opacity, isCounting} = this.state;
    return (
      <ImageBackground
        style={{height: heightPercentageToDP('100%')}}
        source={Images.BG_1}>
        <Animated.View style={[styles.overlay, {opacity}]}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </Animated.View>
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
          <View className="h-[20%] bg-[#E174E420]" />
          <View className="h-[20%] justify-center px-4">
            <View className="flex flex-row justify-center">
              <Entypo
                name="dots-three-horizontal"
                color={'#E174E4'}
                size={32}
              />
            </View>
            <Text className="text-[#E174E4] font-semibold text-center text-xl">
              of type RCTView {isCounting ? 'true' : 'false'} has a shadow set
              but cannot calculate shadow efficiently. Consider setting a
              background color to fix this, or apply the shadow to a more
              specific component.
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
                    <Image source={Images.PLAY} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-base font-bold text-white">Play</Text>
                </TouchableOpacity>
                {/* //Record */}
                <TouchableOpacity
                  onPress={() => this.startRecording()}
                  className="flex items-center ">
                  <View>
                    <Image source={Images.REC} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-base font-bold text-white">Record</Text>
                </TouchableOpacity>
                {/* //save  */}
                <TouchableOpacity className="flex items-center ">
                  <View>
                    <Image source={Images.SAVE} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-base font-bold text-white">Save</Text>
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
      Animated.timing(this.state.opacity, {
        toValue: 0.0,
        duration: 1000,
        useNativeDriver: false,
      }).start();

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
    fontSize: 48,
    color: 'white',
  },
});
export default Page;
