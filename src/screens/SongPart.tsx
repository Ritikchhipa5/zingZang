import React, {useEffect, useState} from 'react';
import {Strings} from '../constant/Strings';
import {Images} from '../constant/Images';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WaveAnimation from '../components/WaveAnimation';
import {addTracks, setupPlayer} from '../service/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ICONS_SVG} from '../assets/svg/icons/Icon';
function SongPart({navigation}: any) {
  const [Part, setPart] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);

  useEffect(() => {
    async function setup() {
      let isSetup: any = await setupPlayer();
      console.log(isSetup);
      const queue: any = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
    }

    setup();
  }, []);

  return (
    <ImageBackground className="h-screen" source={Images.BG_1}>
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

      <SafeAreaView className="h-full ">
        {/* // Heading  */}
        <View className="px-4">
          <View className="flex flex-row items-center ">
            <TouchableOpacity onPress={() => navigation.goBack(' ')}>
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>
            <View
              className="flex flex-row items-center justify-center flex-1"
              style={{
                height: hp('5%'),
              }}>
              <Text className="text-2xl font-semibold text-center text-white">
                Select part of the song
              </Text>
            </View>
          </View>
          <Text
            className="px-4 mt-5 font-light text-left text-white"
            style={{fontSize: hp('2%')}}>
            Select one of the following parts below to sing
          </Text>
        </View>
        {/* //Song part  */}
        <View className="flex-1 mt-8 ">
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}>
            <View className="flex-row flex-wrap justify-between">
              {[
                {id: 1, start: 0},
                {id: 2, start: 66},
                {id: 3, start: 132},
              ].map((part, index) => (
                <TouchableOpacity
                  key={index + 1}
                  className="w-[31.33%]"
                  onPress={() => {
                    if (!isPlay) {
                      setIsPlay(true);
                      TrackPlayer.seekTo(part.start);
                      TrackPlayer.play();
                    } else {
                      setIsPlay(false);
                      TrackPlayer.pause();
                    }
                    setPart(part);
                  }}>
                  <View className="h-[170] relative">
                    <View
                      className={`overflow-hidden rounded-xl bg-[#FEF2FF1A] h-[75%] flex justify-center items-center ${
                        Part?.id === part?.id && 'border-2 border-[#FAAAFC]'
                      }`}>
                      <>
                        {Part?.id === part?.id && isPlay ? (
                          <ICONS_SVG.PAUSE />
                        ) : (
                          <ICONS_SVG.PLAY />
                        )}
                        {Part?.id === part?.id && isPlay && (
                          <View className=" flex justify-center flex-row absolute w-[50%] h-[50%]  -bottom-8 ">
                            <WaveAnimation />
                            <WaveAnimation />
                          </View>
                        )}
                      </>
                    </View>
                    {/* <SoundWave /> */}
                    <Text
                      className={`mt-2 text-lg font-bold text-center text-white ${
                        index == 4 && ' text-[#FAAAFC]'
                      }`}>
                      Part {index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* //Button */}
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('CustomLyrics');
            TrackPlayer.pause();
            setIsPlay(false);
          }}>
          <View
            className={`py-4 ${
              Part ? 'bg-[#F780FB]' : 'bg-[#F780FB4A]'
            }   rounded-full `}>
            <Text className="text-xl font-semibold text-center text-black">
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SongPart;
