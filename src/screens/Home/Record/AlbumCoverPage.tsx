import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {Slider} from '@react-native-assets/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
export default function AlbumCoverPage({navigation, route}: any) {
  const {albumCover} = route.params;
  console.log(albumCover);
  return (
    <View className="flex-1 h-full">
      <ImageBackground
        className="justify-center flex-1 bg-cover"
        source={albumCover}
        blurRadius={30}>
        <View className="flex-[0.8] justify-evenly  ">
          <TouchableOpacity
            onPress={() => navigation.goBack(' ')}
            className="absolute top-[15%] right-0 px-5">
            <AntDesign name="close" color={'#fff'} size={28} />
          </TouchableOpacity>
          <View className=" h-1/2 min-h-[350]">
            <View className="h-full">
              <View>
                <FastImage
                  source={albumCover}
                  className="mx-auto rounded-lg shadow-2xl "
                  style={styles.artCover}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex-[0.2] justify-center">
          <View className="">
            <TouchableOpacity
              className="px-4"
              activeOpacity={0.7}
              onPress={() => navigation.navigate('LyricsPlayer')}>
              <View className={'py-4 bg-[#F780FB] rounded-full '}>
                <Text className="text-xl font-semibold text-center text-black">
                  Listen Remix
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  artCover: {
    height: '100%',
    width: '90%',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 16,
    marginVertical: 24,
  },
});
