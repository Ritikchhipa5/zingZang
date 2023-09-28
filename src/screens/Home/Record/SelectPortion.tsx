import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import {LyricsSongList, OrignalSong} from '../../../service/lyricsService';
import TrackPlayer from 'react-native-track-player';
import {addTracksOnTrackPlayer} from '../../../service/trackPlayerServices';
import {IndividualComp} from '../../../components/Slider/IndividualComp';

const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
const SelectPortion = ({navigation, recordedAudios}: any) => {
  const [pickSong, setPickSong] = useState('');
  const [sliderValues, setSliderValues] = useState({
    original0: 0,
    original1: 10,
    rec0: 0,
    rec1: 10,
  });

  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.reset();
      const queue = (await TrackPlayer.getQueue()).length;
      if (!queue) {
        addTracksOnTrackPlayer(LyricsSongList);
      }
    };
    setup();
  }, []);
  // Function to update the slider values
  const updateSliderValue = (value: any) => {
    setSliderValues(prevValues => ({
      ...prevValues,
      ...value,
    }));
  };
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {/* <AnimatedLinearGradient
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
      /> */}
      <SafeAreaView
        className="h-full "
        edges={['right', 'left', 'top', 'bottom']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-between px-4">
          <TouchableOpacity
            className=""
            onPress={() => {
              navigation.goBack(' ');
              TrackPlayer.pause();
            }}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            Fit the song
          </Text>

          <TouchableOpacity className="">
            <Entypo color="white" name="dots-three-horizontal" size={32} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <Text className="text-[#ffffff] text-xl font-medium ">
            Original Song
          </Text>
          <View className="my-4">
            <IndividualComp
              data={[OrignalSong[0]]}
              selectSong={setPickSong}
              sliderValues={sliderValues}
              originalSong
              updateSliderValue={updateSliderValue}
              // onStartPlay={onStartPlay}
              // isPlaying={isPlaying}
              // onPausePlay={onPausePlay}
            />
          </View>
          <Text className="text-[#ffffff] text-xl font-medium mt-4 ">
            {'Now that you have recorded your voice '}
            <Text className="text-[#f781fb] text-xl font-medium ">
              Select the part you have sung by dragging the cursors
            </Text>
            {
              ' so that it is the same as the part of the original song marked above'
            }
          </Text>
          <View className="mt-8 mb-10">
            <IndividualComp
              data={[recordedAudios[0]]}
              selectSong={setPickSong}
              updateSliderValue={updateSliderValue}
              sliderValues={sliderValues}
              // onStartPlay={onStartPlay}
              // isPlaying={isPlaying}
              // onPausePlay={onPausePlay}
            />
          </View>
        </View>
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.7}
          onPress={async () => {
            navigation.navigate('SongNameEdit', {pickSong, sliderValues});

            await audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
          }}>
          <View className={`py-4 bg-[#F780FB] rounded-full `}>
            <Text className="text-xl font-semibold text-center text-black">
              Continue to Fit the Song 1
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
export default connect(mapStateToProps, null)(SelectPortion);
