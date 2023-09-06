/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ScrollView} from 'react-native-gesture-handler';
import {Strings} from '../../constant/Strings';
import {Images} from '../../constant/Images';
// create a component
const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginButton, setIsLoginButton] = useState(true);
  const [isValidating, setIsValidating] = useState(0);
  //   const [isSignUpDisableButton, setIsSignUpDisableButton] = useState(false);

  useEffect(() => {
    return () => {};
  }, [email, password]);

  const validatingLoginButton = () => {
    return email.length > 0 && password.length > 0 ? false : true;
  };
  // Check All validation
  const isValidated = (text: string, type: string) => {
    setIsValidating(0);
    if (type === 'user_name') {
      if (text.length === 0) {
        setIsValidating(1);
        setEmail('');
      } else {
        setIsValidating(0);
        // const result = text.replace(/[^a-z]/gi, '');
        setEmail(text);
      }
    } else if (type === 'user_password') {
      setPassword(text);
    }
    email.length != 0 && password.length != 0
      ? setIsLoginButton(false)
      : setIsLoginButton(true);
  };
  //SignUp Button Click
  const signinClick = () => {
    const data = {
      user: {
        name: 'nicolas',
      },
      email: 'test200@gmail.com',
      pass: 'test12',
    };

    fetch('http://3.129.111.250:4242/singUpEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        // Alert.alert('ZING ZANG', 'SignIn successfully done', [
        //   {
        //     text: 'OK',
        //     onPress: () => {
        //       console.log('OK Pressed');
        //       navigation.navigate('Home');
        //     },
        //   },
        // ]);
        console.log(res.json());
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{height: hp('5%'), borderWidth: 0}}>
            <View className="flex flex-col items-center justify-center gap-1 mt-3">
              <Text
                className="font-bold text-white"
                style={{
                  fontSize: hp('3%'),
                  marginTop: hp('2.5%'),
                }}>
                {Strings.Welcome_Back}
              </Text>
              <Text
                style={{
                  fontSize: hp('2%'),
                  marginTop: hp('0.5%'),
                  color: '#FFFFFF',
                  // fontWeight: 'semibold',
                }}>
                {Strings.Login_Account}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: hp('20%'),
              alignItems: 'center',
              marginVertical: hp('5%'),
            }}>
            {/* User text input */}
            <View
              style={{
                width: '90%',
                marginTop: hp('2.5%'),
              }}>
              <View style={{flexDirection: 'row', marginLeft: wp('0.5%')}}>
                <Image source={Images.PROFILE} />
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      marginLeft: wp('2.5%'),
                      fontSize: hp('1.5%'),
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {Strings.USER_NAME}
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
                  value={email}
                  onChangeText={e => isValidated(e, 'user_name')}
                  underlineColorAndroid="transparent"
                  placeholder={Strings.ENTER_USER_NAME}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="none"
                  style={{
                    textAlign: 'left',
                    marginLeft: wp('2%'),
                  }}
                />
              </View>
            </View>

            {/* Password text input */}
            <View
              style={{
                width: '90%',
                marginTop: hp('2.5%'),
              }}>
              <View style={{flexDirection: 'row', marginLeft: wp('0.5%')}}>
                <Image source={Images.LOCK} />
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      marginLeft: wp('2.5%'),
                      fontSize: hp('1.5%'),
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {Strings.PASSWORD}
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
                  value={password}
                  onChangeText={e => isValidated(e, 'user_password')}
                  underlineColorAndroid="transparent"
                  placeholder={Strings.ENTER_USER_PASSWORD}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="none"
                  style={{
                    textAlign: 'left',
                    marginLeft: wp('2%'),
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{height: hp('5%'), marginTop: hp('4%')}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                numberOfLines={2}
                className="font-semibold"
                style={{
                  color: '#F780FB',
                  fontSize: hp('2%'),
                  textAlign: 'center',
                }}>
                {Strings.Forgot_password}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: hp('8%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              // disabled={validatingLoginButton()}
              onPress={() => signinClick()}
              activeOpacity={0.7}
              className="rounded-full border-0 bg-[#F780FB] w-[95%] flex flex-row justify-center items-center "
              style={{
                height: hp('6%'),
              }}>
              <Text
                className="font-semibold text-black"
                style={{
                  marginLeft: wp('2%'),
                  fontSize: hp('2%'),
                }}>
                {Strings.LOGIN}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className="items-center justify-center border-0"
            style={{
              height: hp('5%'),
            }}>
            <View
              className="flex flex-row items-center justify-center w-[95%]"
              style={{}}>
              <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
              <View>
                <Text
                  className="font-semibold text-center text-white"
                  style={{
                    width: wp('30%'),

                    fontSize: hp('2%'),
                  }}>
                  {Strings.OR_LOGIN}
                </Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
            </View>
          </View>
          <View className="items-center border-0">
            {[
              {
                icon: Images.GOOGLE_ICON,
                title: Strings.CONTINUE_WITH_GOOGLE,
              },
              {
                icon: Images.FACEBOOK_ICON,
                title: Strings.CONTINUE_WITH_FACEBOOK,
              },
              {
                icon: Images.APPLE_ICON,
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
                <Image source={item.icon} />
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
          <View className="items-center justify-center border-0">
            <View
              className="flex flex-row items-center"
              style={{
                marginVertical: hp('2%'),
              }}>
              <Text
                className="font-semibold text-white"
                style={{
                  fontSize: hp('2%'),
                  marginRight: wp('3%'),
                }}>
                {Strings.DO_NOT_HAVE_ACCOUNT}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUPWithEmailScreen')}>
                <Text
                  className="font-semibold text-[#F780FB]"
                  style={{
                    fontSize: hp('2%'),
                  }}>
                  {Strings.SIGNUP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

//make this component available to the app
export default LoginScreen;
