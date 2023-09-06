import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

export const ActiveTrackDetails = () => {
  return (
    <View className="h-full">
      <View>
        <FastImage
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Basshunter_%E2%80%93_Boten_Anna.jpg',
          }}
          className="mx-auto rounded-lg shadow-2xl "
          style={styles.artCover}
          resizeMode="cover"
        />
      </View>
      <View style={styles.centerContainer}>
        <Text
          className="text-3xl font-semibold text-center text-white"
          numberOfLines={1}>
          Boten Anna
        </Text>
        <Text
          className="text-xl font-medium text-white opacity-50"
          numberOfLines={1}>
          Basshunter
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: {
    height: '100%',
    width: '90%',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 16,
    marginVertical: 24,
  },
});
