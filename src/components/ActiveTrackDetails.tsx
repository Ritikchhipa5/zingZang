import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

export const ActiveTrackDetails = () => {
  return (
    <View className="h-full">
      <View>
        <FastImage
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Lorde_-_Melodrama.png',
          }}
          className="rounded-lg shadow-2xl"
          style={styles.artCover}
          resizeMode="cover"
        />
      </View>
      <View style={styles.centerContainer}>
        <Text
          className="text-3xl font-semibold text-center text-white"
          numberOfLines={1}>
          ZScmn Now You’re Gone
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
    width: '100%',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 16,
    marginVertical: 24,
  },
});
