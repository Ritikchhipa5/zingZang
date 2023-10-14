import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ICONS_SVG} from '../../assets/svg/icons/Icon';
import {IMAGES_SVG} from '../../assets/svg/images/images';

const CreateProject = ({navigation}: any) => {
  const [isCreateProject, setIsCreateProject] = useState(true);

  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView className="flex-1 h-full" edges={['left', 'right']}>
        <View className="items-center h-full">
          {isCreateProject ? (
            <View className="flex justify-between flex-1 w-full py-10">
              <View className="relative px-6 pt-10">
                <Text className="mb-5 text-3xl font-bold text-center text-white">
                  Boost your creativity
                </Text>
                <Text className="text-white text-[18px] text-center font-medium leading-6">
                  Welcome to our song creativity booster! Select your path:
                  Create a new song or remix an existing one to unlock your
                  musical potential.
                </Text>
              </View>

              <TouchableOpacity
                className="items-center w-full "
                activeOpacity={0.7}
                // onPress={() => {
                //   setIsCreateProject(false);
                // }}
                onPress={() => {
                  navigation.navigate('GenerateTrack');
                }}>
                <IMAGES_SVG.CREATE_NEW_PROJECT className="w-full " />
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center w-full "
                activeOpacity={0.7}
                // onPress={() => navigation.navigate('MySongList')}

                onPress={() => {
                  navigation.navigate('SongList');
                }}>
                <IMAGES_SVG.LOAD_PROJECT className="w-full " />
              </TouchableOpacity>
            </View>
          ) : (
            <CreateProjectOption
              setIsCreateProject={setIsCreateProject}
              navigation={navigation}
            />
          )}
        </View>
      </SafeAreaView>
      <View className="flex items-center flex-row justify-between px-16 py-5 bg-[#190D1A80] ">
        <TouchableOpacity
          onPress={() => {
            setIsCreateProject(true);
          }}>
          <ICONS_SVG.HOME />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Reels')}>
          <ICONS_SVG.BLOB />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <ICONS_SVG.USER />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

function CreateProjectOption({navigation, setIsCreateProject}: any) {
  return (
    <>
      <View className="flex flex-col items-center justify-center flex-1 w-full ">
        <TouchableOpacity
          className="flex items-center justify-center flex-1 w-full "
          onPress={() => {
            navigation.navigate('GenerateTrack');
          }}>
          <Image
            source={Images.AI_GENERATED_SONG}
            className="w-[60%] h-[60%]"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex items-center justify-center flex-1 w-full "
          onPress={() => {
            navigation.navigate('SongList');
          }}>
          <Image source={Images.REMIX_A_SONG} className="w-[60%] h-[60%]" />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default CreateProject;
