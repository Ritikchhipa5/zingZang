import {View, Text, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {FUN_FACT_DATA} from '../service/lyricsService';
const DefaultLoading = () => {
  const [musicFacts, setMusicFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState('');
  useEffect(() => {
    // Display a random music fact every 5 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * FUN_FACT_DATA.length);
      setCurrentFact(FUN_FACT_DATA[randomIndex].fact);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [musicFacts]);

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
          repeat
          resizeMode={'cover'}
          className="absolute top-0 bottom-0 left-0 -right-[30%] "
          rate={1.0}
          ignoreSilentSwitch={'obey'}
          style={{
            // width: widthPercentageToDP('100%'),
            height: heightPercentageToDP('100%'),
          }}
        />
        <View className="absolute left-0 bottom-[25%] right-0 w-full   ">
          <Text className="text-xl font-semibold text-center text-white">
            Loading...
          </Text>

          <Text className="px-10 mt-5 text-lg font-semibold text-center text-white opacity-70">
            {currentFact}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DefaultLoading;
