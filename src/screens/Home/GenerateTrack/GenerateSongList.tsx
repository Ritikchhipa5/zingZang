import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {SafeAreaView} from 'react-native-safe-area-context';

import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {Slider} from '@react-native-assets/slider';

import {connect} from 'react-redux';
import {addCurrentSong} from '../../../actions/songs';
import {
  SetupPlayer,
  addTracksOnTrackPlayer,
} from '../../../service/trackPlayerServices';

import {Images} from '../../../constant/Images';

import TrackPlayerModal from '../../../components/Modal/TrackPlayerModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WaveAnimation from '../../../components/WaveAnimation';
import DefaultLoading from '../../../components/DefaultLoading';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
function GenerateSongList({navigation, song, addPlaySong, route}: any) {
  const [Song, setSong] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);
  const [SongList, setSongList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const {generateSong} = route.params;
  const {position, duration, buffered} = useProgress();
  const state = usePlaybackState();

  const [showTrackPlayer, setShowTrackPlayer] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function setup() {
      addTracksOnTrackPlayer(generateSong);
      setSongList([generateSong]);

      // const track: any = await TrackPlayer.getCurrentTrack();
      // const info = await TrackPlayer.getTrack(track);
      // console.log(info, 'info');
    }

    setup();
  }, []);

  console.log(state, buffered, duration, position);

  const handleReload = () => {
    setReload(!reload);
  };

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
      {loading && <DefaultLoading />}
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-between p-4 ">
          <TouchableOpacity onPress={() => handleReload()}>
            <MaterialIcons color="white" name="refresh" size={32} />
          </TouchableOpacity>
          <Text
            className="font-medium text-center text-white "
            style={{fontSize: hp('2.5%')}}>
            Generate Track
          </Text>

          <TouchableOpacity
            className=""
            onPress={async () => {
              navigation.goBack(' ');
              await TrackPlayer.reset();
            }}>
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>
        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {SongList.map((item: any, index: number) => (
            <TouchableOpacity
              className={`flex flex-row items-center  justify-between p-3 bg-[#6836691A] rounded-2xl border-2 border-transparent  ${
                item.id === Song?.id && 'border-[#F780FB]'
              } drop-shadow-md mb-3 `}
              key={index + 1}
              onPress={async () => {
                let data = await TrackPlayer.getCurrentTrack();
                console.log(data, 'fjhsdvfhhj');
                await TrackPlayer.play();
                setSong(item);
                setIsPlay(true);
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
                  onValueChange={async value => {
                    console.log(value);
                    await TrackPlayer.seekTo(value);
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
                  onPress={async () => {
                    if (!isPlay) {
                      await TrackPlayer.play();
                      setIsPlay(true);
                    } else {
                      await TrackPlayer.pause();
                      setIsPlay(false);
                    }
                  }}
                  className="mr-2">
                  {isPlay ? (
                    <Image source={Images.PAUSE} />
                  ) : (
                    <Image source={Images.PLAY} />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : null}
          <TouchableOpacity
            className="px-4 "
            activeOpacity={0.7}
            onPress={async () => {
              navigation.navigate('VideoCoverPage', {generateSong});
              await TrackPlayer.pause();
              await TrackPlayer.reset();
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
      {
        <TrackPlayerModal
          showTrackPlayer={showTrackPlayer}
          setShowTrackPlayer={setShowTrackPlayer}
        />
      }
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
export default connect(mapStateToProps, mapDispatchToProps)(GenerateSongList);
