/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {ICONS_SVG} from '../../../assets/svg/icons/Icon';
import {Strings} from '../../../constant/Strings';
import DefaultLoading from '../../../components/DefaultLoading';
import {Images} from '../../../constant/Images';
import {singUpEmail} from '../../../api/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// create a component
const AccountInfo = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidating, setIsValidating] = useState(0);
  const [isLoading, setLoading] = useState(false);

  //SignUp Button Click
  const signupClick = async (values: any, {setSubmitting}: any) => {
    setLoading(true);
    try {
      await singUpEmail({
        user: {
          name: values?.username,
        },
        email: values?.email,
        pass: values?.pass,
      })
        .then((data: any) => {
          if (data?.status) {
            navigation.navigate('LoginScreen');
          } else {
            Alert.alert(data?.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // Handling form validation
  const validation = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    pass: Yup.string().required('Password is required'),
    confirmPass: Yup.string().oneOf([Yup.ref('pass')], 'Passwords must match'),
  });
  return (
    <>
      {isLoading && <DefaultLoading />}
      <ImageBackground style={{height: hp('100%')}} source={Images.BG}>
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
          <ScrollView className="h-full bg-green">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack(' ');
              }}
              className="absolute z-10">
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>
            <View className="border-0 ">
              <View className="items-center justify-center">
                <ICONS_SVG.LOGO2 style={{marginTop: hp('2%')}} />
                <Text
                  className="font-bold text-white"
                  style={{
                    fontSize: hp('3%'),
                    marginTop: hp('2.5%'),
                  }}>
                  {Strings.ACCOUNT_INFO}
                </Text>
              </View>
            </View>

            <Formik
              initialValues={{
                username: 'test1117@gmail.com',
                email: 'test1117@gmail.com',
                pass: 'confirmPass',
                confirmPass: 'confirmPass',
              }}
              validationSchema={validation}
              onSubmit={signupClick}>
              {({handleChange, handleBlur, handleSubmit, values}: any) => (
                <View className="h-full ">
                  {/* /Form  */}
                  <View className="flex-[0.55]  mt-10 items-center">
                    {[
                      {
                        icon: <ICONS_SVG.PROFILE />,
                        title: Strings.USER_NAME,
                        placeholder: Strings.ENTER_USER_NAME,
                        name: 'username',
                      },
                      {
                        icon: <ICONS_SVG.EMAIL />,
                        title: Strings.EMAIL_ID,
                        placeholder: Strings.ENTER_USER_EMAIL,
                        name: 'email',
                      },
                      {
                        icon: <ICONS_SVG.LOCK />,
                        title: Strings.PASSWORD,
                        placeholder: Strings.ENTER_USER_PASSWORD,
                        name: 'pass',
                      },
                      {
                        icon: <ICONS_SVG.LOCK />,
                        title: Strings.CONFIRM_PASSWORD,
                        placeholder: Strings.ENTER_USER_CONFIRM_PASSWORD,
                        name: 'confirmPass',
                      },
                    ].map((item: any, index: number) => (
                      <View
                        key={index}
                        className="w-[90%]"
                        style={{
                          marginTop: hp('2.5%'),
                        }}>
                        <View
                          className="flex flex-row"
                          style={{marginLeft: wp('0.5%')}}>
                          {item.icon}
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
                            onChangeText={handleChange(item.name)}
                            onBlur={handleBlur(item.name)}
                            value={values[item.name]}
                            underlineColorAndroid="transparent"
                            placeholder={item.placeholder}
                            placeholderTextColor="#FFFFFF"
                            autoCapitalize="none"
                            style={{
                              textAlign: 'left',
                              color: 'white',
                              paddingHorizontal: 8,
                              marginLeft: wp('2%'),
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={{flex: 0.15, marginHorizontal: wp('5%')}}>
                    <View
                      style={{
                        marginVertical: hp('2%'),
                        width: wp('90%'),
                      }}></View>
                  </View>

                  <View
                    style={{
                      //   flex: 0.1,

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="bg-[#F780FB] w-[95%] rounded-full flex flex-row justify-center items-center"
                      style={{
                        height: hp('6%'),
                      }}>
                      <Text
                        className="font-semibold text-black"
                        style={{
                          marginLeft: wp('2%'),
                          fontSize: hp('2%'),
                        }}>
                        {Strings.UPDATE}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

//make this component available to the app
export default AccountInfo;
