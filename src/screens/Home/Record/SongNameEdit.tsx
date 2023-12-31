import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../components/Loading';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
const SongNameEdit = ({navigation, route}: any) => {
  const [Name, setName] = useState('');
  const {pickSong, sliderValues} = route.params;

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
        <View className="flex flex-row items-center justify-between px-4">
          <TouchableOpacity className="" onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            Song Name
          </Text>

          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate('CreateProject')}>
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <Text className="text-[#C6C3C6] text-xl font-medium text-center ">
            This amazing song needs a name!
          </Text>
          <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
            className="items-center justify-center flex-1 h-full">
            <TextInput
              onChangeText={(text: any) => {
                console.log(text);
                setName(text);
              }}
              placeholder="Song Name"
              className="w-full py-3 text-xl font-bold text-center bg-[#FFFFFF1A] text-white rounded-md  items-center leading-2 px-5"
              placeholderTextColor="#fff"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="px-4 "
          activeOpacity={0.7}
          onPress={() => {
            if (Name !== '') {
              navigation.navigate('AlbumCover', {
                pickSong: pickSong,
                songName: Name,
                sliderValues,
              });
            } else {
              Alert.alert('Enter a Song Name');
            }
          }}>
          <View className={'py-4 bg-[#F780FB] rounded-full'}>
            <Text className="text-xl font-semibold text-center text-black">
              Continue to Album Cover
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SongNameEdit;
