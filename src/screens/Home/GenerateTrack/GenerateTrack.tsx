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
import Loading from '../../../components/Loading';
import {addTracksOnTrackPlayer} from '../../../service/trackPlayerServices';
import DefaultLoading from '../../../components/DefaultLoading';
import {useSelector} from 'react-redux';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
const GenerateTrack = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state?.userData)?.user;
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
      <AnimatedLinearGradient
        customColors={[
          // 'rgb(64, 81, 187)',
          'rgba(69, 118, 253, 1)',
          'rgb(59, 49, 128)',
          'rgb(58, 41, 113)',
          'rgb(56, 29, 91)',
          'rgb(55, 24, 82)',
          'rgb(54, 17, 69)',
        ]}
        speed={1500}
      />
      <SafeAreaView
        className="h-full "
        edges={['right', 'left', 'top', 'bottom']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-center px-4">
          <TouchableOpacity
            className="absolute left-0 z-20"
            onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            Generate Track
          </Text>
        </View>

        <Formik
          initialValues={{
            uid: '123dasd3',
            duration: '10',
            text: 'a cool song m sdfnnsmdfn,ka s,m,dfma fk ',
            title: 'mi master pice',
            id: user?.user?.id,
          }}
          validationSchema={validation}
          onSubmit={async values => {
            try {
              setIsLoading(true);
              let data = await createTextSong(values);
              console.log(data);
              setIsLoading(false);

              // addTracksOnTrackPlayer([
              //   {
              //     id: '11223',
              //     url: require('../../../assets/sound/sound.mp3'),
              //     audioPath: data?.data?.path,
              //     duration: values?.duration,
              //     artist: user?.user?.name,
              //     albumCover:
              //       'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
              //     title: values?.title || 'Unknown Title', // Provide a
              //   },
              // ]);
              navigation.navigate('GenerateSongList', {
                generateSong: {
                  id: '1011',
                  url: data?.data?.link,
                  // url: 'https://demos.loopmasters.com/16672%2FREGGAE_SOUND_CLASH_DEMO.mp3',
                  audioPath: data?.data?.path,
                  // isLiveStream: true,
                  duration: values?.duration,
                  artist: user?.user?.name,
                  albumCover:
                    'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
                  title: values?.title || 'Unknown Title', // Provide a
                },
              });
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            } finally {
              setIsLoading(false);
            }
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}: any) => (
            <>
              {isLoading && <DefaultLoading />}
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
