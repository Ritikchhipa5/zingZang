import {
  Alert,
  Image,
  ImageBackground,
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
import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player';
const SelectRecording = ({navigation, recordedAudios}: any) => {
  const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
  const [pickSong, setPickSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const onStartPlay = async () => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(pickSong);

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
        setIsPlaying(!(e.currentPosition === e.duration));
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };
  const onPausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false);
  };
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
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
          <View className="my-10">
            <RadioButton
              data={recordedAudios}
              selectSong={setPickSong}
              onStartPlay={onStartPlay}
              isPlaying={isPlaying}
              onPausePlay={onPausePlay}
            />
          </View>
        </View>
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.7}
          onPress={() => Alert.alert(pickSong)}>
          <View className={`py-4 bg-[#F780FB] rounded-full `}>
            <Text className="text-xl font-semibold text-center text-black">
              Continue
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
    const {data, selectSong, isPlaying, onStartPlay, onPausePlay} = this.props;
    const {value} = this.state;
    return (
      <View>
        {data.map((res: any) => {
          return (
            <TouchableOpacity
              key={res.key}
              style={styles.container}
              onPress={() => {
                this.setState({
                  value: res.uri,
                });
                selectSong(res.uri);
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
                  onPress={
                    isPlaying && value === res.uri ? onPausePlay : onStartPlay
                  }>
                  <Image
                    source={
                      !isPlaying && value === res.uri
                        ? Images.PLAY
                        : Images.PAUSE
                    }
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        <Text> Selected: {this.state.value} </Text>
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
