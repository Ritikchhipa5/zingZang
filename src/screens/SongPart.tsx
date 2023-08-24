import React, {useState} from 'react';
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
import SoundWaveAnimation from '../components/SoundWave';

function SongPart({navigation}: any) {
  const [Part, setPart] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);
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
                  onPress={() => setPart(part)}>
                  <View className="h-[170]">
                    <View
                      className={`rounded-xl bg-[#FEF2FF1A] h-[75%] flex justify-center items-center ${
                        Part?.id === part?.id && 'border-2 border-[#FAAAFC]'
                      }`}>
                      <Image
                        source={
                          Part?.id === part?.id ? Images.PAUSE : Images.PLAY
                        }
                        className="h-[55] w-[55]"
                      />
                      <SoundWaveAnimation />
                    </View>
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
