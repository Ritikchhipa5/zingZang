import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Slider} from '@react-native-assets/slider';
const Setting = ({navigation}: any) => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_2}>
      <SafeAreaView className="h-full px-3">
        {/* // Header  */}
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(' ');
            }}
            className="absolute z-10">
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="flex-1 text-2xl font-semibold text-center text-white">
            Settings
          </Text>
        </View>

        {/* options  */}
        <ScrollView className="gap-3 px-3 mt-3 ">
          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-lg font-semibold text-white">
              Account information
            </Text>
            <MaterialIcons
              color="white"
              name="keyboard-arrow-right"
              size={32}
            />
          </View>
          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-lg font-semibold text-white">
              Push notifications
            </Text>
            <Switch />
          </View>

          <View className="flex flex-row items-center py-4 ">
            <Text className="flex justify-between flex-1 text-lg font-semibold text-white">
              Help and Support
            </Text>
            <MaterialIcons
              color="white"
              name="keyboard-arrow-right"
              size={32}
            />
          </View>
        </ScrollView>
        <View className="">
          <TouchableOpacity
            className="px-4"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignScreen')}>
            <View className={'py-4 bg-[#F780FB] rounded-full '}>
              <Text className="text-xl font-semibold text-center text-black">
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Setting;
