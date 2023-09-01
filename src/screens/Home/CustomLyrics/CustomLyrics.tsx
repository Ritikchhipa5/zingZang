import {Alert, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const CustomLyrics = ({navigation}: any) => {
  return (
    <ImageBackground className="h-screen" source={Images.BG_1}>
      <SafeAreaView className="h-full " edges={['top', 'bottom']}>
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
            <TouchableOpacity className="">
              <MaterialIcons color="white" name="close" size={32} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 px-4">
          <Text
            className="mt-5 font-light font-medium leading-6 text-center text-white "
            style={{fontSize: heightPercentageToDP('2%')}}>
            Tap <Text className="text-[#F780FB] ">Custom Lyrics</Text> to get
            creative! You can rewrite the lyrics to make this song your own.
            Personalize it with your thoughts, emotions, or stories.
            {`\n\n`} If you want preserve the original lyrics and enjoy the song
            as it was intend simply choose{' '}
            <Text className="text-[#F780FB] ">Keep Original </Text>
            We'll play the song with original lyrics.
          </Text>
        </View>
        <View className="">
          <TouchableOpacity
            className="px-4"
            activeOpacity={0.7}
            onPress={() => Alert.alert('Name')}>
            <View className={`py-4 bg-[#F780FB] rounded-full `}>
              <Text className="text-xl font-semibold text-center text-black">
                Custom Lyrics
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CustomLyrics;

const styles = StyleSheet.create({});
