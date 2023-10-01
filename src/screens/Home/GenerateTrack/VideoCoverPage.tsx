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
  ScrollView,
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
  mergeVideoSong,
  requestDownloadLink,
} from '../../../api/generateTrack';
import DefaultLoading from '../../../components/DefaultLoading';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
const VideoCoverPage = ({navigation, route}: any) => {
  const userInfo = useSelector((state: any) => state?.userData)?.user;
  const [Album, setAlbum] = useState(
    'A futuristic techno coverart, in the style of electronic music.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(['']);
  const [AlbumCover, setAlbumCover] = useState<any>({});
  const {generateSong} = route.params;

  const addInput = () => {
    if (inputs.length < 4) {
      setInputs([...inputs, '']); // Add a new empty input
    }
  };

  // Function to handle input text change
  const handleInputChange = (text: any, index: any) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    // Collect all input values from the 'inputs' array
    const inputValues = inputs.filter(input => input.trim() !== '');

    // Do something with the collected values (e.g., send them to a server)
    return inputValues;
  };
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
              <ScrollView>
                {/* <TextInput
                  onChangeText={(text: any) => {
                    console.log(text);
                    setAlbum(text);
                  }}
                  value={Album}
                  multiline={true}
                  numberOfLines={3}
                  placeholder="Write about video description..."
                  className="w-full py-3 text-xl font-medium min-h-[20%] bg-[#FFFFFF1A] text-white rounded-2xl  items-center leading-2  mb-5 px-5"
                  placeholderTextColor="#FFFFFF5A"
                /> */}
                {inputs.map((input, index) => (
                  <TextInput
                    key={index}
                    onChangeText={text => handleInputChange(text, index)}
                    value={input}
                    multiline={true}
                    numberOfLines={3}
                    placeholder={`Input Box ${index + 1}`}
                    className="w-full py-3 text-xl font-medium min-h-[20%] bg-[#FFFFFF1A] text-white rounded-2xl  items-center leading-2  mb-5 px-5"
                    placeholderTextColor="#FFFFFF5A"
                  />
                ))}
                {inputs.length < 4 && (
                  <TouchableOpacity
                    onPress={addInput}
                    className="flex items-center">
                    <AntDesign name="pluscircleo" size={44} color={'white'} />
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </View>

          <View className="px-4 gap-y-3">
            <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={async () => {
                try {
                  setIsLoading(true);

                  let createVideoData: any = await createVideoSong({
                    description: handleSubmit(),
                  });
                  // console.log(createVideoData);
                  if (!createVideoData) {
                    throw new Error();
                  }

                  let merge = await mergeVideoSong({
                    video_path: createVideoData?.s3_key,
                    // video_path:
                    //   'outputs/MjrK0Yx7O2UlkLqU/videoMjrK0Yx7O2UlkLqU.mp4',
                    song_path: generateSong?.audioPath,
                  });

                  console.log(merge);
                  let path: any = await requestDownloadLink({
                    path: merge?.s3_key,
                  });

                  console.log(
                    {
                      id: userInfo?.user?.id,
                      link: merge?.s3_key,
                      description: Album,
                      // title: generateSong?.title,
                      title: userInfo?.user?.name,
                      postProfile: generateSong?.title,
                      path: generateSong?.audioPath,
                    },
                    'VIDEO DATA',
                  );

                  await addVideo({
                    id: userInfo?.user?.id,
                    link: merge?.s3_key,
                    description: Album,
                    // title: generateSong?.title,
                    title: userInfo?.user?.name,
                    postProfile: generateSong?.title,
                    path: generateSong?.audioPath,
                  })
                    .then((res: any) => {
                      if (res?.status) {
                        navigation.navigate('GenerateReel', {
                          id: userInfo?.user?.id,
                          video: path?.data,
                          title: userInfo?.user?.name,
                          description: Album,
                          likes: '245k',
                          isLike: false,
                        });
                      }
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                } catch (error: any) {
                  console.log(error);
                  setIsLoading(false);
                  navigation.navigate('GenerateTrack');
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
            {/* <View
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
            </View> */}
            {/* <TouchableOpacity
              className=""
              activeOpacity={0.7}
              onPress={() => Alert.alert(Album)}>
              <View className={'py-4 bg-[#6BF0F2] rounded-full'}>
                <Text className="text-xl font-semibold text-center text-black">
                  Surprise Me
                </Text>
              </View>
            </TouchableOpacity> */}
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
