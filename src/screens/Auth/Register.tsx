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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {singUpEmail} from '../../api/auth';
import Loading from '../../components/Loading';
interface componentNameProps {}
// create a component
const Register = ({navigation}: any) => {
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
        .then(data => {
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
    <ScrollView>
      {isLoading && <Loading />}
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
              <>
                {/* /Form  */}
                <View className="flex-[0.55]  mt-10 items-center">
                  {[
                    {
                      icon: Images.PROFILE,
                      title: Strings.USER_NAME,
                      placeholder: Strings.ENTER_USER_NAME,
                      name: 'username',
                    },
                    {
                      icon: Images.EMAIL,
                      title: Strings.EMAIL_ID,
                      placeholder: Strings.ENTER_USER_EMAIL,
                      name: 'email',
                    },
                    {
                      icon: Images.LOCK,
                      title: Strings.PASSWORD,
                      placeholder: Strings.ENTER_USER_PASSWORD,
                      name: 'pass',
                    },
                    {
                      icon: Images.LOCK,
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
                          // value={userName}
                          // onChangeText={e => isValidated(e, 'user_name')}
                          onChangeText={handleChange(item.name)}
                          onBlur={handleBlur(item.name)}
                          value={values[item.name]}
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
                  style={{
                    flex: 0.1,
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
              </>
            )}
          </Formik>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
};

//make this component available to the app
export default Register;
