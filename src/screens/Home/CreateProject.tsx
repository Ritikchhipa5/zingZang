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

const CreateProject = ({navigation}: any) => {
  const [isCreateProject, setIsCreateProject] = useState(true);
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

        <View className="items-center py-[30%] gap-3 flex-1  ">
          {isCreateProject ? (
            <>
              <TouchableOpacity
                className="w-full mb-[10%]"
                activeOpacity={0.7}
                onPress={() => {
                  setIsCreateProject(false);
                }}>
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
              <TouchableOpacity
                className="w-full"
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Reels')}>
                <Image
                  source={Images.BG_BLOB}
                  className="w-full ml-[20] -mt-10"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </>
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
      <View className="flex flex-row items-center gap-x-10 ">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GenerateTrack');
          }}>
          <Image source={Images.AI_GENERATED_SONG} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SongList');
          }}>
          <Image source={Images.REMIX_A_SONG} />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default CreateProject;
