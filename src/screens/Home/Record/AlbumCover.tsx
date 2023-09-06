import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {changeLyrics} from '../../../api/record';
import RNFS from 'react-native-fs';
import {connect} from 'react-redux';
import Loading from '../../../components/Loading';
const AlbumCover = ({navigation, recordedAudios}: any) => {
  const [Album, setAlbum] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {isLoading ? <Loading /> : null}
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
                console.log(text);
                setAlbum(text);
              }}
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
            onPress={() => {
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
              changeLyrics({value: data})
                .then(status => {
                  console.log(status);
                  navigation.navigate('TrackPlayer');
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
