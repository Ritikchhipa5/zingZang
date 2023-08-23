import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Strings} from '../constant/Strings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';

function SongList({navigation}: any) {
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_1}>
      <SafeAreaView className="h-full ">
        {/* // Search Box */}
        <View className="px-4">
          <View className="flex flex-row items-center ">
            <TouchableOpacity
              onPress={() => navigation.goBack(' ')}
              activeOpacity={0.7}>
              <Image source={Images.BACK} />
            </TouchableOpacity>

            <View
              className="flex flex-row flex-1 rounded-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                height: hp('5%'),
              }}>
              <TextInput
                value={''}
                //   onChangeText={e => isValidated(e, 'user_name')}
                underlineColorAndroid="transparent"
                placeholder={Strings.Search}
                placeholderTextColor="#FFFFFF"
                autoCapitalize="none"
                className="px-2"
                style={{
                  textAlign: 'left',
                  marginLeft: wp('2%'),
                }}
              />
            </View>
          </View>
          <Text
            className="px-4 mt-5 font-medium text-center text-white"
            style={{fontSize: hp('2.5%')}}>
            Select the song you would like to remix
          </Text>
        </View>
        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {[1, 2, 4].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('TrackPlayer')}>
              <View className="flex flex-row items-center p-3 bg-[#6836691A] rounded-lg drop-shadow-md mb-3">
                <Image
                  source={{
                    uri: 'https://publish.one37pm.net/wp-content/uploads/2023/01/best-rap-album-covers-Mobile-Images-ONE37pm.com_.png?resize=720%2C780',
                  }}
                  className="w-12 h-12 mr-5 rounded-lg"
                />
                <View>
                  <Text className="text-xl font-semibold text-white">
                    Now You’re Gone
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    Basshunter
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* //Button */}
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SongPart')}>
          <View className="py-4 bg-[#F780FB]  rounded-full ">
            <Text className="text-xl font-semibold text-center text-black">
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SongList;
