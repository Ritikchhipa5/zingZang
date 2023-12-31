import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
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
  createAlbumCoverSong,
  requestDownloadLink,
} from '../../../api/generateTrack';
import {addAIRecording, changeLyrics} from '../../../api/record';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import DefaultLoading from '../../../components/DefaultLoading';
const AlbumCover = ({navigation, recordedAudios, route}: any) => {
  const [Album, setAlbum] = useState(
    'A futuristic techno coverart, in the style of electronic music.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [AlbumCover, setAlbumCover] = useState<any>({});
  const [NewSong, setNewSong] = useState(null);
  const {songName, sliderValues} = route.params;
  const user = useSelector((state: any) => state?.userData)?.user;
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {isLoading ? <DefaultLoading /> : null}
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
            Album Cover
          </Text>

          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate('CreateProject')}>
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => Keyboard.dismiss()} className="flex-1 p-4">
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
        </Pressable>

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

              setIsLoading(true);

              let song = {
                s0_original: sliderValues?.original0 ?? 2.77,
                sf_original: sliderValues?.original1 ?? 4.003,
                s0_record: sliderValues?.rec0 ?? 2.815,
                sf_record: sliderValues?.rec1 ?? 10,
              };

              console.log(song, 'Sending Song part ');
              // console.log(
              //   Math.abs(
              //     song?.sf_original -
              //       song?.s0_original -
              //       (song?.sf_record - song?.s0_record),
              //   ),
              //   Math.abs(
              //     song?.sf_original -
              //       song?.s0_original -
              //       (song?.sf_record - song?.s0_record),
              //   ) <= 0.3,
              // );

              let status = await changeLyrics({
                value: {
                  client_id: 'MjrK0Yx7O2UlkLqU',
                  current_key: '1oovbp1z5ExvCf3o',
                  s0: song.s0_original,
                  s1: song.sf_original,
                  r0: song.s0_record,
                  r1: song.sf_record,
                  data: data,
                },
              });

              let songPath: any = await requestDownloadLink({
                path: status?.s3_key,
              });

              console.log(songPath?.data, 'SONG GET ');
              setNewSong(songPath?.data);

              setIsLoading(true);
              let albumData = await createAlbumCoverSong({
                prompt: Album,
                negative_prompt: '',
                client_id: 'MjrK0Yx7O2UlkLqU',
                current_key: '1oovbp1z5ExvCf3o',
              });

              await addAIRecording({
                title: songName,
                albumCover: albumData?.images[0],
                link: status?.s3_key,
                id: user?.user?.id,
              })
                .then(async (data: any) => {
                  let path: any = await requestDownloadLink({
                    path: albumData?.images[0],
                  });
                  console.log(
                    {
                      title: songName,
                      albumCover: albumData?.images[0],
                      link: status?.s3_key,
                      id: user?.user?.id,
                    },
                    data,
                    'addSongDdata',
                  );
                  navigation.navigate('AlbumCoverPage', {
                    albumCover: {
                      uri: path?.data,
                    },
                    generatedSong: songPath?.data,
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
