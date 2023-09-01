import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Loading = () => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}
      className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black ">
      <SafeAreaView
        edges={['bottom', 'top']}
        className="items-center justify-center flex-1">
        <View className="flex-[0.5]">
          <Image source={Images.LOGO} />
        </View>
        <View className="flex-[0.4]">
          <Text className="text-3xl font-semibold text-white">
            I am working on it.
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Loading;
