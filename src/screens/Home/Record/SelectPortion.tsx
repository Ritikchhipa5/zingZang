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
import React, {Component, useEffect, useState} from 'react';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player';
import {ICONS_SVG} from '../../../assets/svg/icons/Icon';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {Slider} from '@miblanchard/react-native-slider';

const SelectPortion = ({navigation, recordedAudios}: any) => {
  const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
  const [pickSong, setPickSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const onStartPlay = async () => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(pickSong);
      const volume = await audioRecorderPlayer.setVolume(1.0);

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
  const onStopPlay = async (): Promise<void> => {
    await audioRecorderPlayer.stopPlayer();
    setIsPlaying(false);
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
              data={[recordedAudios[0]]}
              selectSong={setPickSong}
              onStartPlay={onStartPlay}
              isPlaying={isPlaying}
              onPausePlay={onPausePlay}
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
          <View className="mb-10 mt-8">
            <IndividualComp
              data={[recordedAudios[0]]}
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
          onPress={() => {
            if (pickSong !== '') {
              navigation.navigate('SelectPortion', {pickSong});
            } else {
              Alert.alert('Please select a recording');
            }
            onStopPlay();
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

export const SliderContainer = (props: {
  caption?: string;
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
  vertical?: boolean;
}) => {
  //console.log(`<<<<<< thumbsecond style = ${thumbSecondStyle}`);
  const DEFAULT_VALUE = 0.2;
  const {caption, sliderValue, trackMarks} = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE,
  );
  useEffect(() => {
    console.log(`\n\n Slider Values  = ${value}`);
  }, [value]);
  let renderTrackMarkComponent: React.ReactNode;
  const borderWidth = 4;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? {borderColor: 'red', borderWidth, left: -borderWidth / 2}
          : {borderColor: 'grey', borderWidth, left: -borderWidth / 2};
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(
      props.children,
      (child: React.ReactElement, index: number) => {
        if (!!child && child.type === Slider) {
          return React.cloneElement(child, {
            onValueChange: setValue,
            renderTrackMarkComponent,
            trackMarks,
            value,
          });
        }

        return child;
      },
    );
  };

  return (
    <View style={{paddingVertical: 16}}>
      <View
        style={{
          backgroundColor: '#27132b',
          paddingVertical: 4,
        }}>
        <Image
          style={{
            height: 45,
            width: 264,
            zIndex: 1,
            resizeMode: 'cover',
          }}
          source={Images.WAVES}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '30%',
          height: 45 + 8,
          width: 264 + 16,
          marginLeft: -8,
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: '#27132b',
        }}>
        {renderChildren()}
      </View>
    </View>
  );
};

const IndividualComp = ({
  data,
  selectSong,
  isPlaying,
  onStartPlay,
  onPausePlay,
}) => {
  const [value, setValue] = useState(null);
  const [val1, setVal1] = useState<number>(60);
  const [val2, setVal2] = useState<number>(60);
  return (
    <View>
      {data.map((res: any, index: number) => {
        console.log(`<<<<< res = ${JSON.stringify(res)}`);
        return (
          <View
            style={{
              backgroundColor: '#27132b',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 8,
              paddingVertical: 4,
            }}>
            {/* <View
            className={`flex gap-x-3 p-3 
            flex-row
            my-4
            items-center justify-between bg-[#E174E41A] rounded-xl flex-1 ${
              value === res.key
                ? 'border-2 border-[#F780FB]'
                : 'border-2 border-transparent'
            } `}> */}
            <View
              style={{
                width: '80%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'flex-end',
                //backgroundColor: '#ff0000',
              }}>
              <SliderContainer sliderValue={[10, 20]}>
                <Slider
                  animateTransitions
                  containerStyle={{
                    width: 264 + 16,
                    height: 24,
                  }}
                  maximumValue={100}
                  thumbTintColor={'#6af0f3'}
                  //minimumTrackTintColor={'#ff0000'}
                  minimumTrackTintColor="#ffffff88"
                  minimumValue={4}
                  //thumbImage={Images.PLAY}
                  //thumbImage={Images.PLAY}
                  step={1}
                  thumbStyle={{
                    width: 12,
                    height: 52,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  //thumbImage={Images.PLAY}
                  thumbTouchSize={{
                    width: 12,
                    height: 48,
                  }}
                  //thumbTintColor="#1a9274"
                  trackStyle={{
                    backgroundColor: '#00000011',
                    borderRadius: 1,
                    height: 52,
                  }}
                />
              </SliderContainer>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={
                  isPlaying && value === res.uri ? onPausePlay : onStartPlay
                }>
                {!isPlaying && value === res.uri ? (
                  <ICONS_SVG.PLAY />
                ) : (
                  <ICONS_SVG.PAUSE />
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

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
