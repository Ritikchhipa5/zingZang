import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Strings} from '../constant/Strings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';

function SongList({navigation}: any) {
  const [Song, setSong] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<any>(false);
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_1}>
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
        {/* // Search Box */}
        <View className="px-4">
          <View className="flex flex-row items-center ">
            <TouchableOpacity
              onPress={() => navigation.goBack(' ')}
              activeOpacity={0.7}>
              <Image source={Images.BACK} />
            </TouchableOpacity>

            <View
              className="flex flex-row flex-1 rounded-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                height: hp('5%'),
              }}>
              <TextInput
                value={''}
                //   onChangeText={e => isValidated(e, 'user_name')}
                underlineColorAndroid="transparent"
                placeholder={Strings.Search}
                placeholderTextColor="#FFFFFF"
                autoCapitalize="none"
                className="px-2"
                style={{
                  textAlign: 'left',
                  marginLeft: wp('2%'),
                }}
              />
            </View>
          </View>
          <Text
            className="px-4 mt-5 font-medium text-center text-white"
            style={{fontSize: hp('2.5%')}}>
            Select the song you would like to remix
          </Text>
        </View>
        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {[
            {
              id: 1,
              name: 'Now You’re Gone',
              artist: 'Basshunter',
            },
            {id: 2, name: 'Done Again', artist: 'Basshunter'},
            {
              id: 3,
              name: 'Wack upGone',
              artist: 'Basshunter',
            },
          ].map((item: any, index: number) => (
            <TouchableOpacity
              className={`flex flex-row items-center  justify-between p-3 bg-[#6836691A] rounded-2xl border-2 border-transparent  ${
                item.id === Song?.id && 'border-[#F780FB]'
              } drop-shadow-md mb-3 `}
              key={index + 1}
              onPress={() => {
                setSong(item);
                setIsPlay(true);
              }}>
              <View className={`flex flex-row items-center`}>
                <Image
                  source={{
                    uri: 'https://publish.one37pm.net/wp-content/uploads/2023/01/best-rap-album-covers-Mobile-Images-ONE37pm.com_.png?resize=720%2C780',
                  }}
                  className="w-12 h-12 mr-5 rounded-lg"
                />
                <View>
                  <Text className="text-xl font-semibold text-white">
                    {item.name}
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    {item.artist}
                  </Text>
                </View>
              </View>
              {item.id === Song?.id && (
                <Image
                  source={Images.Song_Bars}
                  className="w-12 h-12 rounded-lg"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* //Button */}
        <View className={`pb-10 ${Song ? 'bg-[#6836693A]' : 'transparent'}`}>
          {Song ? (
            <>
              <View className="h-1.5 bg-[#683669]" />
              <View className="flex flex-row items-center justify-between py-2">
                <View className="flex-row items-center justify-between rounded-lg drop-shadow-md">
                  <View className="flex flex-row items-center p-3 ">
                    <Image
                      source={{
                        uri: 'https://publish.one37pm.net/wp-content/uploads/2023/01/best-rap-album-covers-Mobile-Images-ONE37pm.com_.png?resize=720%2C780',
                      }}
                      className="w-12 h-12 mr-5 rounded-lg"
                    />
                    <View>
                      <Text className="text-xl font-semibold text-white">
                        {Song?.name}
                      </Text>
                      <Text className="font-normal text-md text-zinc-300 ">
                        {Song?.artist}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setIsPlay(!isPlay)}
                  className="mr-2">
                  {isPlay ? (
                    <Image source={Images.PAUSE} />
                  ) : (
                    <Image source={Images.PLAY} />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : null}
          <TouchableOpacity
            className="px-4 "
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SongPart')}>
            <View
              className={`py-4 ${
                Song ? 'bg-[#F780FB]' : 'bg-[#F780FB4A]'
              }   rounded-full `}>
              <Text className="text-xl font-semibold text-center text-black">
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SongList;
