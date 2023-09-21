import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
} from 'react-native';
import RNFS from 'react-native-fs';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import Loading from '../../../components/Loading';
import {
  createAlbumCoverSong,
  requestDownloadLink,
} from '../../../api/generateTrack';
import {changeLyrics} from '../../../api/record';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
const AlbumCover = ({navigation, recordedAudios, route}: any) => {
  const [Album, setAlbum] = useState(
    'A futuristic techno coverart, in the style of electronic music.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [AlbumCover, setAlbumCover] = useState<any>({});
  const [NewSong, setNewSong] = useState(null);
  const {pickSong, songName} = route.params;

  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {isLoading ? <Loading /> : null}
      <AnimatedLinearGradient
        customColors={[
          // 'rgb(64, 81, 187)',
          // 'rgb(62, 67, 161)',
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
            Album Cover
          </Text>

          <TouchableOpacity className="">
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <View className="flex-1 h-full gap-y-4">
            <Text className="text-[#C6C3C6] text-lg text-left font-medium ">
              Describe your album cover
            </Text>
            <TextInput
              onChangeText={(text: any) => {
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
              let data = new FormData();
              console.log(
                recordedAudios[0]?.uri?.replace(
                  `file://${RNFS.DocumentDirectoryPath}/`,
                  '',
                ),
                recordedAudios[0]?.uri,
              );
              data.append('input_files', {
                uri: recordedAudios[0]?.uri,
                type: 'audio/m4a',
                name: recordedAudios[0]?.uri?.replace(
                  `file://${RNFS.DocumentDirectoryPath}/`,
                  '',
                ),
              });

              console.log(data?.getParts());
              setIsLoading(true);

              let song = {
                s0_original: 2.77,
                sf_original: 4.003,
                s0_record: 2.815,
                sf_record: 10,
              };
              console.log(
                Math.abs(
                  song?.sf_original -
                    song?.s0_original -
                    (song?.sf_record - song?.s0_record),
                ),
                Math.abs(
                  song?.sf_original -
                    song?.s0_original -
                    (song?.sf_record - song?.s0_record),
                ) <= 0.3,
              );

              // await changeLyrics({
              //   value: {
              //     client_id: 'MjrK0Yx7O2UlkLqU',
              //     current_key: '1oovbp1z5ExvCf3o',
              //     s0: 3,
              //     s1: 6,
              //     r0: 2,
              //     r1: 5,
              //     data: data,
              //   },
              // })
              //   .then(async status => {
              //     let path: any = await requestDownloadLink({
              //       path: status?.s3_key,
              //     });
              //     console.log(status?.s3_key, 'sdfjsdfbkjsbfsdfkjb');

              //     setNewSong(path?.s3_key);
              //     console.log(path);
              //     // navigation.navigate('TrackPlayer');
              //   })
              //   .catch(err => {
              //     console.log(err, 'wejrjhwjehgrj');
              //   })

              //   .finally(() => {
              //     setIsLoading(false);
              //   });
              setIsLoading(true);
              await createAlbumCoverSong({
                prompt: Album,
                negative_prompt: '',
                client_id: 'MjrK0Yx7O2UlkLqU',
                current_key: '1oovbp1z5ExvCf3o',
              })
                .then(async (data: any) => {
                  console.log(data?.images[0]);
                  let path: any = await requestDownloadLink({
                    path: data?.images[0],
                  });

                  navigation.navigate('AlbumCoverPage', {
                    albumCover: {
                      uri: path?.data,
                    },
                    // song: NewSong,
                    song: 'https://zing-zang-vc.s3.eu-central-1.amazonaws.com/outputs/MjrK0Yx7O2UlkLqU/apple.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAX7S6GKEMIQOXVR5P%2F20230919%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230919T133719Z&X-Amz-Expires=900&X-Amz-Signature=23f645ba8fc2e2206ff8cdef7dd3b878ca74de69a52883383eed007f401be35c&X-Amz-SignedHeaders=host',
                    songName: songName,
                  });
                  setIsLoading(false);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}>
            <View className={'py-4 bg-[#F780FB] rounded-full'}>
              <Text className="text-xl font-semibold text-center text-black">
                Generate Album Cover
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
    </ImageBackground>
  );
};

const mapStateToProps = (state: any) => {
  return {
    recordedAudios: state.records.recordedAudios,
  };
};
export default connect(mapStateToProps, null)(AlbumCover);
