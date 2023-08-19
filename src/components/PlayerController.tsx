import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
function PlayerController() {
  return (
    <View style={styles.playerToolbox}>
      <Ionicons name="play-back" size={50} color={'#fff'} />
      <Ionicons name="play-circle-sharp" size={50} color={'#fff'} />
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
