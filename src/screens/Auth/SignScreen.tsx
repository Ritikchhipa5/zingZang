/* eslint-disable react-native/no-inline-styles */
//import liraries
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../constant/Images';
import {Strings} from '../../constant/Strings';
import {ICONS_SVG} from '../../assets/svg/icons/Icon';

// create a component
const SignScreen = ({navigation}: any) => {
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.3, borderWidth: 0}}>
          <View className="items-center justify-center flex-1 border-0 ">
            <ICONS_SVG.LOGO />
            <Text
              className="font-bold text-white"
              style={{
                fontSize: hp('2.5%'),
                marginTop: hp('2.5%'),
              }}>
              {Strings.SIGNUP_SCREEN}
            </Text>
          </View>
        </View>
        <View className="flex-[0.3] border-0 items-center ">
          {[
            {
              icon: <ICONS_SVG.GOOGLE />,
              title: Strings.CONTINUE_WITH_GOOGLE,
            },
            {
              icon: <ICONS_SVG.FACEBOOK />,
              title: Strings.CONTINUE_WITH_FACEBOOK,
            },
            {
              icon: <ICONS_SVG.APPLE />,
              title: Strings.CONTINUE_WITH_APPLE,
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#FAFAFA33] rounded-full w-[95%] flex flex-row justify-center items-center border-[0.5px] border-white"
              style={{
                height: hp('6%'),
                marginVertical: hp('1%'),
              }}>
              {/* <Image source={item.icon} /> */}
              {item.icon}
              <Text
                className="font-semibold"
                style={{
                  marginLeft: wp('2%'),
                  fontSize: hp('2.2%'),
                  color: '#FFFFFF',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-[0.3] border-0 justify-center items-center">
          <View className="flex flex-row items-center w-[95%]">
            <View className="flex-1 h-[1] bg-white" />
            <View>
              <Text
                className="w-[50px] font-semibold text-center text-white"
                style={{
                  fontSize: hp('2%'),
                }}>
                {Strings.OR}
              </Text>
            </View>
            <View className="flex-1 h-[1] bg-white" />
          </View>
        </View>
        <View className="flex-[0.2] border-0 justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            className="bg-[#F780FB] w-[95%] rounded-full flex flex-row justify-center items-center"
            style={{
              height: hp('6%'),
            }}>
            <Text
              className="font-semibold"
              style={{
                marginLeft: wp('2%'),
                fontSize: hp('2%'),
                color: '#000',
              }}>
              {Strings.SIGNIN_WITH_EMAIL}
            </Text>
          </TouchableOpacity>
          <View
            className="flex flex-row items-center"
            style={{
              marginVertical: hp('2%'),
            }}>
            <Text
              className="flex-row items-center font-semibold text-center text-white it"
              style={{
                fontSize: hp('2%'),
                marginRight: wp('3%'),
              }}>
              {Strings.DO_NOT_HAVE_ACCOUNT}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                className="text-[#F780FB] text-center font-semibold"
                style={{
                  fontSize: hp('2%'),
                }}>
                {Strings.SIGNUP}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

//make this component available to the app
export default SignScreen;
