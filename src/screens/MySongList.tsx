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
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from '../service/trackPlayerServices';
import {userInfoAdd} from '../actions/record';
import {connect} from 'react-redux';
import {addCurrentSong} from '../actions/songs';

function MySongList({navigation, user, addPlaySong}: any) {
  const [Song, setSong] = useState<any>(null);
  const [SongList, setSongList] = useState<any>([]);
  const [isPlay, setIsPlay] = useState<any>(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      console.log(isSetup, queue?.length);
      if (isSetup && queue.length <= 0) {
        await loadAndPlayTracks();
      }
    }

    setup();
  }, [user?.user?.id]);

  console.log('fsdj', user?.user?.id);

  async function loadAndPlayTracks() {
    requestTextSongs({
      id: user?.user?.id ?? 'm56jBT1HlYaOtpn4',
    }).then(async data => {
      console.log(data.data);
      TrackPlayer.reset();
      let newData = data.data.map((item: any, index: number) => {
        return {
          id: index,
          url: item.link,
          isLiveStream: true,
          duration: 200,
          artist: item?.artist,
          albumCover: item?.albumCover,
          title: item.title || 'Unknown Title', // Provide a
        };
      });

      TrackPlayer.add(newData);
      setSongList(newData);
    });
  }

  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_2}>
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
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

        {/* //Song List */}
        <ScrollView className="flex-1 px-4 mt-10 ">
          {
            // [
            //   {
            //     id: 1,
            //     albumCover:
            //       'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
            //     name: 'Boten Anna',
            //     artist: 'Basshunter',
            //   },
            // ]
            SongList.map((item: any, index: number) => (
              <TouchableOpacity
                key={index + 1}
                className={`bg-[#6836693A] rounded-lg drop-shadow-md mb-3  flex-row justify-between items-center border-2 border-transparent ${
                  item.id === Song?.id && 'border-[#F780FB]'
                }`}
                onPress={async () => {
                  setSong(item);
                  setIsPlay(true);
                  console.log(item);
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
                <TouchableOpacity className="mr-2">
                  <Entypo color="white" name="dots-three-vertical" size={22} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <View className="bottom-0 ">
          <View className="h-1.5 bg-[#683669] " />
          <View className="py-2 pb-10 flex flex-row items-center justify-between bg-[#6836693A]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackPlayer');
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
