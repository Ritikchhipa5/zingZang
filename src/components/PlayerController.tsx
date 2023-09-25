import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
function PlayerController() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View style={styles.playerToolbox}>
      <Ionicons name="play-back" size={50} color={'#fff'} />

      <TouchableOpacity
        onPress={async () => {
          if (!isPlaying) {
            TrackPlayer.play();
            setIsPlaying(true);
          } else {
            TrackPlayer.pause();
            setIsPlaying(true);
          }
        }}>
        <Ionicons name="play-circle-sharp" size={50} color={'#fff'} />
      </TouchableOpacity>
      <Ionicons name="play-forward" size={50} color={'#fff'} />
    </View>
  );
}

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
  },
});
export default PlayerController;
