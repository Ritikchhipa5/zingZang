import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SoundWaveAnimation = () => {
  const animatedHeights = [...Array(3)].map(() => new Animated.Value(120));

  React.useEffect(() => {
    const animations = animatedHeights.map(animatedHeight => {
      return Animated.sequence([
        Animated.timing(animatedHeight, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.loop(Animated.parallel(animations)).start();
  }, []);

  const animatedStyles = animatedHeights.map((animatedHeight, index) => {
    return {
      height: animatedHeight,
      backgroundColor: '#9CF5F6',
      width: 3,
      borderRadius: 100,
      marginHorizontal: 1, // Adjust spacing between bars
    };
  });

  return (
    <View style={styles.soundWaveContainer}>
      {animatedStyles.map((style, index) => (
        <Animated.View key={index} style={[styles.soundWaveBar, style]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  soundWaveContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // height: 120, // Adjust the height as needed
    width: '100%',
    // backgroundColor: '#f0f0f0',
    // overflow: 'hidden',
  },
  soundWaveBar: {
    backgroundColor: '#9CF5F6',
  },
});

export default SoundWaveAnimation;
