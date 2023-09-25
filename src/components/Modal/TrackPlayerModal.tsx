import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActiveTrackDetails from '../ActiveTrackDetails';
import {Slider} from '@react-native-assets/slider';
import PlayerController from '../PlayerController';
import {connect} from 'react-redux';

import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {addTracksOnTrackPlayer} from '../../service/trackPlayerServices';
const TrackPlayerModal = ({showTrackPlayer, setShowTrackPlayer, song}: any) => {
  const {position, duration, buffered} = useProgress();
  const state = usePlaybackState();
  console.log(state, position, duration, buffered);
  return (
    <Modal transparent={true} visible={showTrackPlayer}>
      <View className="absolute top-0 bottom-0 w-full">
        <ImageBackground
          className="justify-center flex-1 bg-cover"
          source={{
            uri: song?.currentSong?.albumCover,
          }}
          blurRadius={30}>
          <View className="flex-[0.8] justify-evenly  ">
            <TouchableOpacity
              onPress={() => {
                setShowTrackPlayer(false);
                TrackPlayer.pause();
              }}
              className="absolute top-[15%] right-0 px-5">
              <AntDesign name="close" color={'#fff'} size={28} />
            </TouchableOpacity>
            <View className=" mt-10 h-1/2 min-h-[350]">
              <ActiveTrackDetails />
            </View>
          </View>

          <View className="flex-[0.2] justify-center ">
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
    </Modal>
  );
};

const mapStateToProps = (state: any) => {
  return {
    song: state.songs,
  };
};
export default connect(mapStateToProps, null)(TrackPlayerModal);
