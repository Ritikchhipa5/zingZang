import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
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

function MySongList({navigation}: any) {
  const [Song, setSong] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);
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
        <View className="flex-1 px-4 mt-10 ">
          {[
            {
              id: 1,
              albumCover:
                'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
              name: 'Boten Anna',
              artist: 'Basshunter',
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index + 1}
              className={`bg-[#6836693A] rounded-lg drop-shadow-md mb-3  flex-row justify-between items-center border-2 border-transparent ${
                item.id === Song?.id && 'border-[#F780FB]'
              }`}
              onPress={() => {
                setSong(item);
                setIsPlay(true);
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
                    {item.name}
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
          ))}
        </View>
        <View className="bottom-0 ">
          <View className="h-1.5 bg-[#683669] " />
          <View className="py-2 pb-10 flex flex-row items-center justify-between bg-[#6836693A]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackPlayer');
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
                    {Song?.name}
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    {Song?.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-2"
              onPress={() => {
                setIsPlay(!isPlay);
              }}>
              <Image source={isPlay ? Images.PAUSE : Images.PLAY} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default MySongList;
