import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useState} from 'react';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {ICONS_SVG} from '../../../assets/svg/icons/Icon';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player';
import {ExternalStorageDirectoryPath} from 'react-native-fs';
const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
const SelectRecording = ({navigation, recordedAudios}: any) => {
  const [pickSong, setPickSong] = useState<any>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const onStartPlay = async () => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(pickSong?.uri);

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
        setIsPlaying(!(e.currentPosition === e.duration));
        return;
      });
      setIsPlaying(true);
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };
  const onPausePlay = async (): Promise<void> => {
    try {
      await audioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error pausing playback:', error);
    }
  };

  const onStopPlay = async (): Promise<void> => {
    try {
      console.log('stopPlayer');
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping playback:', error);
    }
  };

  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <AnimatedLinearGradient
        customColors={[
          // 'rgb(64, 81, 187)',
          'rgba(69, 118, 253, 1)',
          'rgb(59, 49, 128)',
          'rgb(58, 41, 113)',
          'rgb(56, 29, 91)',
          'rgb(55, 24, 82)',
          'rgb(54, 17, 69)',
        ]}
        speed={1500}
      />
      <SafeAreaView
        className="h-full "
        edges={['right', 'left', 'top', 'bottom']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-between px-4">
          <TouchableOpacity className="" onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            My Songs
          </Text>

          <TouchableOpacity className="">
            <Entypo color="white" name="dots-three-horizontal" size={32} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <Text className="text-[#C6C3C6] text-xl font-medium text-center ">
            That was great! Select the recording that you like the most
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} className="my-10">
            <RadioButton
              data={recordedAudios}
              selectSong={setPickSong}
              isPlaying={isPlaying}
              onStartPlay={onStartPlay}
              onStopPlay={onStopPlay}
              onPausePlay={onPausePlay}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.7}
          onPress={() => {
            if (pickSong !== '') {
              if (2 <= pickSong?.duration) {
                navigation.navigate('SelectPortion', {pickSong: pickSong?.uri});
                console.log(pickSong);
              } else {
                Alert.alert('Recording length must be 2 seconds');
              }
            } else {
              Alert.alert('Please select a recording');
            }
            onStopPlay();
          }}>
          <View className={`py-4 bg-[#F780FB] rounded-full `}>
            <Text className="text-xl font-semibold text-center text-black">
              Continue to Fit the Song 2
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const mapStateToProps = (state: any) => {
  return {
    recordedAudios: state.records.recordedAudios,
  };
};
export default connect(mapStateToProps, null)(SelectRecording);

class RadioButton extends Component<any, any> {
  state = {
    value: null,
  };
  render() {
    const {data, selectSong, isPlaying, onStartPlay, onPausePlay, onStopPlay} =
      this.props;
    const {value} = this.state;
    console.log(data);
    return (
      <View>
        {data.map((res: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.container}
              onPress={() => {
                this.setState({
                  value: res.uri,
                });
                selectSong(res);
                onStopPlay();
              }}>
              <View className="flex-[0.2]">
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: value === res.uri ? '#F780FB' : '#fff',
                    },
                  ]}>
                  {value === res.uri && <View style={styles.selectedRb} />}
                </View>
              </View>
              {/* <Text style={styles.radioText}>{res.text}</Text> */}
              <View
                className={`flex gap-x-3 p-3 flex-row items-center justify-between bg-[#E174E41A] rounded-xl flex-[0.8] ${
                  value === res.key
                    ? 'border-2 border-[#F780FB]'
                    : 'border-2 border-transparent'
                } `}>
                <Image source={Images.WAVES} />
                <TouchableOpacity
                  onPress={() => {
                    console.log(isPlaying, value === res.uri);
                    if (!isPlaying && value === res.uri) {
                      onStartPlay();
                    } else {
                      onStopPlay();
                    }
                  }}>
                  {isPlaying && value === res.uri ? (
                    <ICONS_SVG.PAUSE />
                  ) : (
                    <ICONS_SVG.PLAY />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#F780FB',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
