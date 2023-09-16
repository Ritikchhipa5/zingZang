import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {createTextSong} from '../../../api/generateTrack';
const GenerateTrack = ({navigation}: any) => {
  const validation = Yup.object({
    text: Yup.string().required('Text is required'),
    duration: Yup.string().required('Duration is required'),
    title: Yup.string().required('Title is required'),
    id: Yup.string().required('ID is required'),
  });
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView
        className="h-full "
        edges={['right', 'left', 'top', 'bottom']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-center px-4">
          <TouchableOpacity
            className="absolute left-0 z-10"
            onPress={() => navigation.goBack('')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            Generate Track
          </Text>

          {/* <TouchableOpacity className="">
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity> */}
        </View>

        <Formik
          initialValues={{
            uid: '123dasd3',
            duration: '10',
            text: 'a cool song m sdfnnsmdfn,ka s,m,dfma fk ',
            title: 'mi master pice',
            id: 'iqag02hi7VRQLwAG',
          }}
          validationSchema={validation}
          onSubmit={async values => {
            console.log(values);
            navigation.navigate('GenerateSongList');
            // try {
            //   let data = await createTextSong(values);
            //   Alert.alert(data?.message);
            //   console.log(data?.message);
            // } catch (error) {
            //   console.log(error);
            // }
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}: any) => (
            <>
              <ScrollView className="flex-1 px-4 gap-y-4 ">
                <View className=" gap-y-4">
                  <View className="gap-y-4">
                    <Text className="text-lg font-semibold text-white">
                      1. Music Name
                    </Text>

                    <TextInput
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      placeholder="Track Name "
                      className="w-full py-3 text-xl font-medium  bg-[#FFFFFF1A] text-[#C6C3C6] rounded-md  items-center leading-2 px-5"
                      placeholderTextColor="#C6C3C6"
                    />
                  </View>
                  <View className=" gap-y-2">
                    <Text className="text-lg font-semibold text-white">
                      2. Describe your track
                    </Text>
                    <TextInput
                      placeholder="Relaxing video background track..."
                      onChangeText={handleChange('text')}
                      onBlur={handleBlur('text')}
                      value={values.text}
                      numberOfLines={4}
                      multiline
                      className="w-full py-3 text-xl font-medium h-[200]  bg-[#FFFFFF1A]   text-[#C6C3C6] rounded-md  items-center leading-2 px-5"
                      placeholderTextColor="#C6C3C6"
                    />
                  </View>
                  <View className="gap-y-2">
                    <Text className="text-lg font-semibold text-white">
                      3. Enter duration
                    </Text>
                    <TextInput
                      onChangeText={handleChange('duration')}
                      onBlur={handleBlur('duration')}
                      value={values.duration}
                      placeholder="00:25"
                      keyboardType="numeric"
                      className="w-full py-3 text-xl font-medium  bg-[#FFFFFF1A] text-[#C6C3C6] rounded-md  items-center leading-2 px-5"
                      placeholderTextColor="#C6C3C6"
                    />
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  height: heightPercentageToDP('8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  // disabled={validatingLoginButton()}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.7}
                  className="rounded-full border-0 bg-[#F780FB] w-[95%] flex flex-row justify-center items-center "
                  style={{
                    height: heightPercentageToDP('6%'),
                  }}>
                  <Text
                    className="font-semibold text-black"
                    style={{
                      marginLeft: widthPercentageToDP('2%'),
                      fontSize: heightPercentageToDP('2%'),
                    }}>
                    Generate Track
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GenerateTrack;
