import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {requestTextSongs} from '../api/generateTrack';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {
  addTracksOnTrackPlayer,
  setupPlayer,
} from '../service/trackPlayerServices';
import {userInfoAdd} from '../actions/record';
import {connect, useSelector} from 'react-redux';
import {addCurrentSong} from '../actions/songs';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

function MySongList({navigation, user, addPlaySong}: any) {
  const [Song, setSong] = useState<any>(null);
  const [SongList, setSongList] = useState<any>([]);
  const [isPlay, setIsPlay] = useState<any>(false);
  const [reload, setReload] = useState(false);
  const {position, duration, buffered} = useProgress();
  const state = usePlaybackState();
  console.log(state, buffered, duration, position);

  useEffect(() => {
    loadAndPlayTracks();
    console.log(user);
  }, [reload]);

  async function loadAndPlayTracks() {
    requestTextSongs({
      id: user?.user?.id,
    }).then(async data => {
      let newData = data.data.map((item: any, index: number) => {
        return {
          id: index,
          url: item.link,
          isLiveStream: true,
          duration: 200,
          artist: item?.artist,
          albumCover: item?.albumCover,
          title: item.title || 'Unknown Title',
        };
      });

      addTracksOnTrackPlayer(newData);
      setSongList(newData);
    });
  }

  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_2}>
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
        <View className="flex flex-row items-center justify-center px-4">
          <TouchableOpacity
            className="absolute left-0"
            onPress={async () => {
              await TrackPlayer.reset();
              navigation.navigate('CreateProject');
            }}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="items-start text-2xl font-semibold text-center text-white ">
            My Songs
          </Text>
          {/* <TouchableOpacity className="" onPress={() => handleReload()}>
            <Entypo color="white" name="dots-three-horizontal" size={32} />
          </TouchableOpacity> */}
        </View>
        {/* //Song List */}

        {SongList?.length ? (
          <>
            <ScrollView className="relative flex-1 px-4 mt-10 ">
              {SongList.map((item: any, index: number) => (
                <TouchableOpacity
                  key={index + 1}
                  className={`bg-[#6836693A] rounded-lg drop-shadow-md mb-3  flex-row justify-between items-center border-2 border-transparent ${
                    item.id === Song?.id && 'border-[#F780FB]'
                  }`}
                  onPress={async () => {
                    setSong(item);
                    setIsPlay(true);
                    await TrackPlayer.skip(index);
                    await TrackPlayer.play();
                  }}>
                  <View className="flex flex-row items-center p-3 ">
                    <Image
                      source={{
                        uri: item?.albumCover,
                      }}
                      className="w-12 h-12 mr-5 rounded-lg"
                    />
                    <View>
                      <Text className="text-xl font-semibold text-white">
                        {item?.title?.slice(0, 20)}
                      </Text>
                      <Text className="font-normal text-md text-zinc-300 ">
                        {item.artist}
                      </Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity className="mr-2">
                    <Entypo
                      color="white"
                      name="dots-three-vertical"
                      size={22}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View className="bottom-0 ">
              <View className="h-1.5 bg-[#683669] " />
              <View className="py-2 pb-10 flex flex-row items-center justify-between bg-[#6836693A]">
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('TrackPlayer');
                    addPlaySong(Song);
                  }}
                  className="flex-row items-center justify-between rounded-lg drop-shadow-md">
                  <View className="flex flex-row items-center p-3 ">
                    <Image
                      source={{
                        uri: Song?.albumCover,
                      }}
                      className="w-12 h-12 mr-5 rounded-lg"
                    />
                    <View>
                      <Text className="text-xl font-semibold text-white">
                        {Song?.title?.slice(0, 20)}
                      </Text>
                      <Text className="font-normal text-md text-zinc-300 ">
                        {Song?.artist}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="mr-2"
                  onPress={() => {
                    if (!isPlay) {
                      setIsPlay(true);
                      TrackPlayer.play();
                    } else {
                      setIsPlay(false);
                      TrackPlayer.pause();
                    }
                  }}>
                  <Image source={isPlay ? Images.PAUSE : Images.PLAY} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View className="items-center justify-center flex-1 ">
            <Text className="text-xl font-semibold text-white ">
              Song ☹️ is not available
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.userData?.user,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    userInfoAdd: (user: any) => {
      dispatch(userInfoAdd(user));
    },
    addPlaySong: (song: any) => {
      dispatch(addCurrentSong(song));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MySongList);
