import React, {useEffect, useState} from 'react';
import {Strings} from '../constant/Strings';
import {Images} from '../constant/Images';
import {
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

function SongPart({navigation}: any) {
  const [Part, setPart] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      console.log(isSetup);
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
    }

    setup();
  }, []);
  return (
    <ImageBackground className="h-screen" source={Images.BG_1}>
      <SafeAreaView className="h-full ">
        {/* // Heading  */}
        <View className="px-4">
          <View className="flex flex-row items-center ">
            <TouchableOpacity onPress={() => navigation.goBack(' ')}>
              <Image source={Images.BACK} />
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
              {[{id: 1}, {id: 2}, {id: 3}].map((part, index) => (
                <TouchableOpacity
                  key={index + 1}
                  className="w-[31.33%]"
                  onPress={() => {
                    if (!isPlay) {
                      setIsPlay(true);
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
                        <Image
                          source={
                            Part?.id === part?.id && isPlay
                              ? Images.PAUSE
                              : Images.PLAY
                          }
                          className="h-[55] w-[55]"
                        />
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
          onPress={() => navigation.navigate('SongPart')}>
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
