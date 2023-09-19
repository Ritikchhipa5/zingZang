import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
  Image,
  Keyboard,
  Pressable,
} from 'react-native';
import RNFS from 'react-native-fs';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect, useSelector} from 'react-redux';
import Loading from '../../../components/Loading';
import {
  addVideo,
  createVideoSong,
  requestDownloadLink,
} from '../../../api/generateTrack';
import DefaultLoading from '../../../components/DefaultLoading';

const VideoCoverPage = ({navigation, route}: any) => {
  const userInfo = useSelector((state: any) => state?.userData)?.user;
  const [Album, setAlbum] = useState(
    'A futuristic techno coverart, in the style of electronic music.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [AlbumCover, setAlbumCover] = useState<any>({});
  const {generateSong} = route.params;
  console.log(generateSong?.title, userInfo?.user?.id);
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {isLoading && <DefaultLoading />}
      <Pressable onPress={Keyboard.dismiss}>
        <SafeAreaView
          className="h-full "
          edges={['right', 'left', 'top', 'bottom']}>
          {/* // Search Box */}
          <View className="flex flex-row items-center justify-between px-4">
            <TouchableOpacity
              className=""
              onPress={() => navigation.goBack(' ')}>
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-center text-white ">
              Video Reel
            </Text>

            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.navigate('CreateProject');
              }}>
              <MaterialIcons color="white" name="close" size={32} />
            </TouchableOpacity>
          </View>

          <View className="flex-1 p-4">
            <View className="flex-1 h-full gap-y-4">
              <Text className="text-[#C6C3C6] text-lg text-left font-medium ">
                Describe your Video Reel
              </Text>
              <TextInput
                onChangeText={(text: any) => {
                  console.log(text);
                  setAlbum(text);
                }}
                value={Album}
                multiline={true}
                numberOfLines={5}
                placeholder="Two clasped hands on a red base..."
                className="w-full py-3 text-xl font-medium min-h-[40%] bg-[#FFFFFF1A] text-white rounded-2xl  items-center leading-2  mb-5 px-5"
                placeholderTextColor="#FFFFFF5A"
              />
            </View>
          </View>

          <View className="px-4 gap-y-3">
            <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={async () => {
                setIsLoading(true);
                try {
                  let data: any = await createVideoSong({
                    description: Album,
                  });
                  // .then(data => {
                  //   console.log(data, 'akdfasdjasdnkjask');
                  // })
                  // .catch(error => {
                  //   console.log(error);
                  // })
                  // .finally(() => {
                  //   setIsLoading(false);
                  // });

                  let path: any = await requestDownloadLink({
                    path: data?.s3_key,
                  });

                  await addVideo({
                    id: userInfo?.user?.id,
                    link: path?.data,
                    description: Album,
                    title: generateSong?.title,
                    postProfile: generateSong?.title,
                  })
                    .then((res: any) => {
                      console.log(res, 'Video Link');
                      if (res?.status) {
                        navigation.navigate('GenerateReel', {
                          id: userInfo?.user?.id,
                          video: path?.data,
                          title: generateSong?.title,
                          description: Album,
                          likes: '245k',
                          isLike: false,
                        });
                        Alert.alert('Video reel is created successfully');
                      }
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                } catch (error) {
                } finally {
                  setIsLoading(false);
                }
              }}>
              <View className={'py-4 bg-[#F780FB] rounded-full'}>
                <Text className="text-xl font-semibold text-center text-black">
                  Generate Video Reel
                </Text>
              </View>
            </TouchableOpacity>
            {/* // Separation  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flex: 1, borderBottomWidth: 1, borderColor: 'white'}}
              />
              <Text className="mx-5 text-lg text-white">Can't you decide?</Text>
              <View
                style={{flex: 1, borderBottomWidth: 1, borderColor: 'white'}}
              />
            </View>
            <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={() => Alert.alert(Album)}>
              <View className={'py-4 bg-[#6BF0F2] rounded-full'}>
                <Text className="text-xl font-semibold text-center text-black">
                  Surprise Me
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Pressable>
    </ImageBackground>
  );
};

const mapStateToProps = (state: any) => {
  return {
    recordedAudios: state.records.recordedAudios,
  };
};
export default connect(mapStateToProps, null)(VideoCoverPage);
