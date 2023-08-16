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

// create a component
const SignScreen = ({navigation}: any) => {
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.3, borderWidth: 0}}>
          <View className="items-center justify-center flex-1 border-0 ">
            <Image source={Images.HEADPHONE} />
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
        <View style={{flex: 0.3, borderWidth: 0, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.2)',
              height: hp('6%'),
              width: '95%',
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp('2%'),
              borderWidth: 0.5,
              borderColor: '#FFFFFF',
            }}>
            <Image source={Images.GOOGLE_ICON} />
            <Text
              style={{
                marginLeft: wp('2%'),
                fontSize: hp('2.5%'),
                color: '#FFFFFF',
              }}>
              {Strings.CONTINUE_WITH_GOOGLE}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.2)',
              height: hp('6%'),
              width: '95%',
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp('2%'),
              borderWidth: 0.5,
              borderColor: '#FFFFFF',
            }}>
            <Image source={Images.FACEBOOK_ICON} />
            <Text
              style={{
                marginLeft: wp('2%'),
                fontSize: hp('2.5%'),
                color: '#FFFFFF',
              }}>
              {Strings.CONTINUE_WITH_FACEBOOK}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.2)',
              height: hp('6%'),
              width: '95%',
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp('2%'),
              borderWidth: 0.5,
              borderColor: '#FFFFFF',
            }}>
            <Image source={Images.APPLE_ICON} />
            <Text
              style={{
                marginLeft: wp('2%'),
                fontSize: hp('2.5%'),
                color: '#FFFFFF',
              }}>
              {Strings.CONTINUE_WITH_APPLE}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.3,
            borderWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '95%'}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
            <View>
              <Text
                style={{
                  width: 50,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontSize: hp('2%'),
                }}>
                {Strings.OR}
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            borderWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              backgroundColor: '#F780FB',
              height: hp('6%'),
              width: '95%',
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: wp('2%'),
                fontSize: hp('2.5%'),
                color: '#FFFFFF',
              }}>
              {Strings.SIGNIN_WITH_EMAIL}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: hp('2%'),
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: hp('2%'),
                marginRight: wp('3%'),
              }}>
              {Strings.DO_NOT_HAVE_ACCOUNT}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#F780FB',
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
