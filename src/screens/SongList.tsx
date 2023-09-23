import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler, TextInput} from 'react-native-gesture-handler';
import {Strings} from '../constant/Strings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import SoundWave from '../components/SoundWave';
import WaveAnimation from '../components/WaveAnimation';
import {
  addTracks,
  addTracksOnTrackPlayer,
  setupPlayer,
} from '../service/trackPlayerServices';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@react-native-assets/slider';
import TrackPlayerModal from '../components/Modal/TrackPlayerModal';
import {LyricsSongList} from '../service/lyricsService';
import {addCurrentSong} from '../actions/songs';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ICONS_SVG} from '../assets/svg/icons/Icon';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

function SongList({navigation, song, addPlaySong}: any) {
  const [Song, setSong] = useState<any>(null);

  const [isPlay, setIsPlay] = useState<any>(false);

  useEffect(() => {
    async function setup() {
      addTracksOnTrackPlayer(LyricsSongList);
    }

    setup();
  }, []);
  const {position, duration} = useProgress();
  const [showTrackPlayer, setShowTrackPlayer] = useState(false);

  console.log(song);
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_1}>
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
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
        {/* // Search Box */}
        <View className="px-4 mt-3">
          <View className="flex flex-row items-center ">
            <TouchableOpacity
              onPress={async () => {
                navigation.goBack(' ');
                await TrackPlayer.reset();
              }}
              activeOpacity={0.7}>
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>

            <View
              className="flex flex-row flex-1 rounded-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                height: hp('5%'),
              }}>
              <TextInput
                value={''}
                //   onChangeText={e => isValidated(e, 'user_name')}
                underlineColorAndroid="transparent"
                placeholder={Strings.Search}
                placeholderTextColor="#FFFFFF"
                autoCapitalize="none"
                className="px-2"
                style={{
                  textAlign: 'left',
                  marginLeft: wp('2%'),
                }}
              />
            </View>
          </View>
          <Text
            className="px-4 mt-5 font-medium text-center text-white"
            style={{fontSize: hp('2.5%')}}>
            Select the song you would like to remix
          </Text>
        </View>
        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {LyricsSongList.map((item: any, index: number) => (
            <TouchableOpacity
              className={`flex flex-row items-center  justify-between p-3 bg-[#6836691A] rounded-2xl border-2 border-transparent  ${
                item.id === Song?.id && 'border-[#F780FB]'
              } drop-shadow-md mb-3 `}
              key={index + 1}
              onPress={async () => {
                setSong(item);
                setIsPlay(true);

                await TrackPlayer.play();
              }}>
              <View className={`flex flex-row items-center`}>
                <Image
                  source={{
                    uri: item.albumCover,
                  }}
                  className="w-12 h-12 mr-5 rounded-lg"
                />
                <View>
                  <Text className="text-xl font-semibold text-white">
                    {item.title}
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    {item.artist}
                  </Text>
                </View>
              </View>
              {item.id === Song?.id && (
                <View className="flex flex-row w-[50] h-[30]">
                  <WaveAnimation />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* //Button */}
        <View className={`pb-10 ${Song ? 'bg-[#6836693A]' : 'transparent'}`}>
          {Song ? (
            <>
              {/* <View className="h-1.5 bg-[#683669]" /> */}
              <TouchableOpacity>
                <Slider
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  minimumTrackTintColor="#9CF5F6"
                  maximumTrackTintColor="#683669"
                  thumbStyle={{
                    backgroundColor: 'transparent',
                  }}
                  trackStyle={{
                    height: 5,
                  }}
                  onValueChange={value => {
                    console.log(value);
                    TrackPlayer.seekTo(value);
                  }}
                />
              </TouchableOpacity>
              <View className="flex flex-row items-center justify-between py-2">
                <View className="flex-row items-center justify-between rounded-lg drop-shadow-md">
                  <TouchableOpacity
                    onPress={() => {
                      setShowTrackPlayer(true);

                      addPlaySong(Song);
                    }}
                    className="flex flex-row items-center p-3 ">
                    <Image
                      source={{
                        uri: Song?.albumCover,
                      }}
                      className="w-12 h-12 mr-5 rounded-lg"
                    />
                    <View>
                      <Text className="text-xl font-semibold text-white">
                        {Song?.title}
                      </Text>
                      <Text className="font-normal text-md text-zinc-300 ">
                        {Song?.artist}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (!isPlay) {
                      setIsPlay(true);
                      TrackPlayer.play();
                    } else {
                      setIsPlay(false);
                      TrackPlayer.pause();
                    }
                  }}
                  className="mr-2">
                  {isPlay ? <ICONS_SVG.PAUSE /> : <ICONS_SVG.PLAY />}
                </TouchableOpacity>
              </View>
            </>
          ) : null}
          <TouchableOpacity
            className="px-4 "
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SongPart');
              TrackPlayer.pause();
            }}>
            <View
              className={`py-4 ${
                Song ? 'bg-[#F780FB]' : 'bg-[#F780FB4A]'
              }   rounded-full `}>
              <Text className="text-xl font-semibold text-center text-black">
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <TrackPlayerModal
        showTrackPlayer={showTrackPlayer}
        setShowTrackPlayer={setShowTrackPlayer}
      />
    </ImageBackground>
  );
}

const mapStateToProps = (state: any) => {
  return {
    song: state.songs,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPlaySong: (song: any) => {
      dispatch(addCurrentSong(song));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
