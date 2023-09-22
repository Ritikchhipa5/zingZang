import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ICONS_SVG} from '../../assets/svg/icons/Icon';
import {IMAGES_SVG} from '../../assets/svg/images/images';
import {getInfo} from '../../utils/aws';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
const CreateProject = ({navigation}: any) => {
  const [isCreateProject, setIsCreateProject] = useState(true);
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView
        className="flex-1 h-full"
        edges={['bottom', 'top', 'left', 'right']}>
        <View
          className={` flex flex-row items-center px-3 z-20 ${
            isCreateProject && 'justify-end'
          }`}>
          {!isCreateProject ? (
            <TouchableOpacity
              className=""
              onPress={() => {
                setIsCreateProject(true);
              }}>
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <ICONS_SVG.USER color="white" width={40} height={40} />
            </TouchableOpacity>
          )}
        </View>

        <View className="items-center h-full ">
          {isCreateProject ? (
            <View className="flex justify-center flex-1 w-full gap-y-[20%] ">
              <TouchableOpacity
                className="items-center w-full "
                activeOpacity={0.7}
                onPress={() => {
                  setIsCreateProject(false);
                }}>
                <IMAGES_SVG.CREATE_NEW_PROJECT className="w-full " />
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center w-full "
                activeOpacity={0.7}
                onPress={() => navigation.navigate('MySongList')}>
                {/* <Image
                  source={Images.LOADING_PROJECT}
                  className="w-full"
                  resizeMode="contain"
                /> */}
                <IMAGES_SVG.LOAD_PROJECT className="w-full " />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full flex-[0.3]"
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Reels')}>
                <Image
                  source={Images.BG_BLOB}
                  className="flex-1 w-full  ml-[20]   "
                  resizeMode="cover"
                />
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
