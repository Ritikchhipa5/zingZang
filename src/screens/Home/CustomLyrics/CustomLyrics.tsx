import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CustomLyrics = ({navigation}: any) => {
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
                height: heightPercentageToDP('5%'),
              }}>
              <Text className="text-2xl font-semibold text-center text-white">
                Custom lyrics
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View className="h-full">
            <Text
              className="mt-5 font-light font-medium leading-6 text-center text-white "
              style={{fontSize: heightPercentageToDP('2%')}}>
              Tap <Text className="text-[#F780FB] ">Custom Lyrics</Text> to get
              creative! You can rewrite the lyrics to make this song your own.
              Personalize it with your thoughts, emotions, or stories.
              {`\n\n`} If you want preserve the original lyrics and enjoy the
              song as it was intend simply choose{' '}
              <Text className="text-[#F780FB] ">Keep Original </Text>
              We'll play the song with original lyrics.
            </Text>
          </View>
          <View className="flex gap-4 ">
            <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SongPart')}>
              <View
                className={`py-4 ${
                  true ? 'bg-[#F780FB]' : 'bg-[#F780FB4A]'
                }   rounded-full `}>
                <Text className="text-xl font-semibold text-center text-black">
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SongPart')}>
              <View
                className={`py-4 ${
                  true ? 'border-[#F780FB] border-2' : 'bg-[#F780FB4A]'
                }   rounded-full `}>
                <Text className="text-xl font-semibold text-center text-[#F780FB]">
                  Keep Original
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CustomLyrics;

const styles = StyleSheet.create({});
