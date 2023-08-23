import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Images} from '../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CreateProject = ({navigation}: any) => {
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView className="h-full px-3">
        <View className="flex flex-row justify-end ">
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image
              source={Images.USER_PROFILE}
              className=""
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="items-center py-[30%] gap-3 flex-1 ">
          <TouchableOpacity
            className="w-full"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SongList')}>
            <Image
              source={Images.CREATE_PROJECT}
              className="w-full "
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MySongList')}>
            <Image
              source={Images.LOADING_PROJECT}
              className="w-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateProject;
