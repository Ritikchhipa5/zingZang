import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Setting = () => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_2}>
      <SafeAreaView className="h-full px-3">
        {/* // Header  */}
        <View className="flex flex-row items-center">
          <TouchableOpacity className="absolute">
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="flex-1 text-2xl font-semibold text-center text-white">
            Setting
          </Text>
        </View>

        {/* options  */}
        <ScrollView className="gap-3 px-3 mt-10">
          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-xl font-semibold text-white">
              Account information
            </Text>
            <MaterialIcons
              color="white"
              name="keyboard-arrow-right"
              size={32}
            />
          </View>
          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-xl font-semibold text-white">
              Push notifications
            </Text>
            <MaterialIcons
              color="white"
              name="keyboard-arrow-right"
              size={32}
            />
          </View>
          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-xl font-semibold text-white">
              Help and Support
            </Text>
            <MaterialIcons
              color="white"
              name="keyboard-arrow-right"
              size={32}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Setting;
