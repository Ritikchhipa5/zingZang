import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';

function MySongList({navigation}: any) {
  return (
    <ImageBackground style={{height: hp('100%')}} source={Images.BG_2}>
      <SafeAreaView className="h-full " edges={['right', 'left', 'top']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-between px-4">
          <TouchableOpacity className="" onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            My Songs
          </Text>
          <TouchableOpacity className="">
            <Entypo color="white" name="dots-three-horizontal" size={32} />
          </TouchableOpacity>
        </View>

        {/* //Song List */}
        <View className="flex-1 px-4 mt-10 ">
          {[1, 2, 4].map((item, index) => (
            <TouchableOpacity key={index}>
              <View className="bg-[#6836693A] rounded-lg drop-shadow-md mb-3  flex-row justify-between items-center">
                <View className="flex flex-row items-center p-3 ">
                  <Image
                    source={{
                      uri: 'https://publish.one37pm.net/wp-content/uploads/2023/01/best-rap-album-covers-Mobile-Images-ONE37pm.com_.png?resize=720%2C780',
                    }}
                    className="w-12 h-12 mr-5 rounded-lg"
                  />
                  <View>
                    <Text className="text-xl font-semibold text-white">
                      Now You’re Gone
                    </Text>
                    <Text className="font-normal text-md text-zinc-300 ">
                      Basshunter
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="mr-2">
                  <Entypo color="white" name="dots-three-vertical" size={22} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="bottom-0">
          <View className="h-1.5 bg-[#683669]" />
          <View className="py-2 flex flex-row items-center justify-between bg-[#6836693A]">
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
                    Now You’re Gone
                  </Text>
                  <Text className="font-normal text-md text-zinc-300 ">
                    Basshunter
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="mr-2">
              <Image source={Images.Loading_Song_Circle} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default MySongList;
