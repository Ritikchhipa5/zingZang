/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import {checkEmail} from '../utils/Utils';
import axios from 'axios';
import {Images} from '../../constant/Images';
import {Strings} from '../../constant/Strings';
// import { SafeAreaView } from 'react-native-safe-area-context';
interface componentNameProps {}
// create a component
const Register = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidating, setIsValidating] = useState(0);

  // Check All validation
  const isValidated = (text: string, type: string) => {
    setIsValidating(0);
    if (type === 'user_name') {
      if (text.length === 0) {
        setIsValidating(1);
        setUserName('');
      } else {
        setIsValidating(0);
        const result = text.replace(/[^a-z]/gi, '');
        setUserName(result);
      }
    } else if (type === 'user_email') {
      setEmailId(text);
    } else if (type === 'user_password') {
      setPassword(text);
    } else if (type === 'user_confirm_password') {
      setConfirmPassword(text);
    }
  };
  const validatingSignInButton = () => {
    return userName.length > 0 &&
      emailId.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
      ? false
      : true;
  };
  //SignUp Button Click
  const signupClick = () => {
    // if (!checkEmail(emailId)) {
    //   setIsValidating(2);
    // } else if (password != confirmPassword) {
    //   setIsValidating(4);
    // } else {
    //   Alert.alert('ZING ZANG', 'Signup successfully done', [
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]);
  };

  return (
    <ScrollView>
      <ImageBackground style={{height: hp('100%')}} source={Images.BG}>
        <SafeAreaView style={{flex: 1}}>
          <View className="flex-[0.2] border-0">
            <View className="items-center justify-center">
              <Image style={{marginTop: hp('2%')}} source={Images.ISOTYPE} />
              <Text
                className="font-bold text-white"
                style={{
                  fontSize: hp('3%'),
                  marginTop: hp('2.5%'),
                }}>
                {Strings.SIGNUP_EMAIL_SCREEN}
              </Text>
              <Text
                className="font-semibold text-white"
                style={{
                  fontSize: hp('2%'),
                  marginTop: hp('1.5%'),
                }}>
                {Strings.CREATE_NEW_ACCOUNT}
              </Text>
            </View>
          </View>

          {/* /Form  */}
          <View className="flex-[0.55]  mt-10 items-center">
            {[
              {
                icon: Images.PROFILE,
                title: Strings.USER_NAME,
                placeholder: Strings.ENTER_USER_NAME,
              },
              {
                icon: Images.EMAIL,
                title: Strings.EMAIL_ID,
                placeholder: Strings.ENTER_USER_EMAIL,
              },
              {
                icon: Images.LOCK,
                title: Strings.PASSWORD,
                placeholder: Strings.ENTER_USER_PASSWORD,
              },
              {
                icon: Images.LOCK,
                title: Strings.CONFIRM_PASSWORD,
                placeholder: Strings.ENTER_USER_CONFIRM_PASSWORD,
              },
            ].map(item => (
              <>
                <View
                  className="w-[90%]"
                  style={{
                    marginTop: hp('2.5%'),
                  }}>
                  <View
                    className="flex flex-row"
                    style={{marginLeft: wp('0.5%')}}>
                    <Image source={item.icon} />
                    <View className="justify-center">
                      <Text
                        className="font-semibold text-center text-white"
                        style={{
                          marginLeft: wp('2.5%'),
                          fontSize: hp('1.8%'),
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      height: hp('5%'),
                      borderRadius: 10,
                      marginTop: hp('1%'),
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      value={userName}
                      onChangeText={e => isValidated(e, 'user_name')}
                      underlineColorAndroid="transparent"
                      placeholder={item.placeholder}
                      placeholderTextColor="#FFFFFF"
                      autoCapitalize="none"
                      style={{
                        textAlign: 'left',
                        paddingHorizontal: 8,
                        marginLeft: wp('2%'),
                      }}
                    />
                  </View>
                </View>
              </>
            ))}
          </View>

          <View style={{flex: 0.15, marginHorizontal: wp('5%')}}>
            <View
              style={{
                marginVertical: hp('2%'),
                width: wp('90%'),
              }}>
              <Text
                numberOfLines={2}
                className="font-semibold"
                style={{
                  textAlign: 'left',
                  color: '#FFFFFF',
                  fontSize: hp('1.8%'),
                }}>
                {Strings.BY_SIGNUP}
              </Text>
              <TouchableOpacity>
                <Text
                  numberOfLines={2}
                  className="font-semibold text-[#F780FB] mt-[5px]"
                  style={{
                    fontSize: hp('1.8%'),
                  }}>
                  {Strings.ZING_ZANG}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              disabled={validatingSignInButton()}
              onPress={() => signupClick()}
              className="bg-[#F780FB] w-[95%] rounded-full flex flex-row justify-center items-center"
              style={{
                // backgroundColor: validatingSignInButton()
                //   ? 'rgba(254, 242, 255, 0.2)'
                //   : '#F780FB',
                height: hp('6%'),
              }}>
              <Text
                className="font-semibold text-black"
                style={{
                  marginLeft: wp('2%'),
                  fontSize: hp('2%'),
                  // color: validatingSignInButton()
                  //   ? 'rgba(251, 197, 253, 1)'
                  //   : '#FFFFFF',
                }}>
                {Strings.SIGNUP}
              </Text>
            </TouchableOpacity>
            <View
              className="flex flex-row items-center"
              style={{
                marginVertical: hp('2%'),
              }}>
              <Text
                className="flex-row items-center font-semibold text-center text-white"
                style={{
                  fontSize: hp('2%'),
                  marginRight: wp('3%'),
                }}>
                {Strings.ALREADY_SIGNUP}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignScreen')}>
                <Text
                  className="text-[#F780FB] font-semibold"
                  style={{
                    fontSize: hp('2%'),
                  }}>
                  {Strings.SIGNIN}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
};

//make this component available to the app
export default Register;
