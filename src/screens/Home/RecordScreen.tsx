import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Images} from '../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
const RecordScreen = ({navigation}: any) => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView className="justify-between flex-1 h-full gap-10 ">
        {/* // Close Icons */}
        <View className="flex flex-row justify-end">
          <TouchableOpacity
            onPress={() => navigation.goBack(' ')}
            className="right-0 px-5 ">
            <AntDesign name="close" color={'#fff'} size={28} />
          </TouchableOpacity>
        </View>
        {/* // Wave view */}
        <View className="h-[20%] bg-[#E174E420]" />
        <View className="h-[20%] justify-center px-4">
          <View className="flex flex-row justify-center">
            <Entypo name="dots-three-horizontal" color={'#E174E4'} size={32} />
          </View>
          <Text className="text-[#E174E4] font-semibold text-center text-xl">
            of type RCTView has a shadow set but cannot calculate shadow
            efficiently. Consider setting a background color to fix this, or
            apply the shadow to a more specific component.
          </Text>
        </View>
        <View className="px-5 ">
          <View className="h-1.5 bg-zinc-600" />
          <View className="mt-5">
            <View className="flex flex-row justify-around ">
              {[
                {img: Images.PLAY, text: 'Play'},
                {img: Images.REC, text: 'Record'},
                {img: Images.SAVE, text: 'Save'},
              ].map((item, index) => (
                <TouchableOpacity className="flex items-center " key={index}>
                  <View>
                    <Image source={item.img} className="w-[60] h-[60] " />
                  </View>
                  <Text className="text-base font-bold text-white">
                    {item.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RecordScreen;
