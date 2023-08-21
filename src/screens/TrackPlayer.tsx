import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import React from 'react';

import {ActiveTrackDetails} from '../components/ActiveTrackDetails';
import {Slider} from '@react-native-assets/slider';
import PlayerController from '../components/PlayerController';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function TrackPlayer({navigation}: any) {
  return (
    <View className="flex-1 h-full">
      <ImageBackground
        className="justify-center flex-1 bg-cover"
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png',
        }}
        blurRadius={30}>
        <View className="flex-[0.7] justify-evenly  ">
          <View className="absolute top-[15%] right-0 px-5">
            <AntDesign name="close" color={'#fff'} size={28} />
          </View>
          <View className=" h-1/2 min-h-[350]">
            <ActiveTrackDetails />
          </View>
        </View>

        <View className="flex-[0.3] justify-center">
          <View className="items-center justify-center">
            <Slider
              style={{
                width: Dimensions.get('window').width - 50,
              }}
              minimumValue={0}
              maximumValue={50}
              CustomThumb={() => <Text>{''}</Text>}
              minimumTrackTintColor={'#fff'}
            />
            <View
              style={{
                width: Dimensions.get('window').width - 50,
              }}
              className="flex flex-row justify-between w-full ">
              <Text className="text-white ">0:00</Text>
              <Text className="text-white ">0:00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 16,
            }}>
            <PlayerController />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
