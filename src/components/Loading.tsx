import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
const Loading = () => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}
      className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black ">
      <SafeAreaView
        edges={['bottom', 'top']}
        className="relative items-center justify-center flex-1">
        {/* <View className="flex-[0.5]"></View> */}
        <Video
          source={Images.LOADING}
          paused={false}
          repeat={true}
          resizeMode={'cover'}
          className="absolute top-0 bottom-0 left-0 -right-[30%] "
          rate={1.0}
          ignoreSilentSwitch={'obey'}
          style={{
            // width: widthPercentageToDP('100%'),
            height: heightPercentageToDP('100%'),
          }}
        />
        <View className="absolute left-0 bottom-[30%] right-0 w-full   ">
          <Text className="text-3xl font-semibold text-center text-white">
            I am working on it.
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Loading;
