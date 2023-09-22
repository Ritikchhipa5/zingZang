import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Image, useWindowDimensions} from 'react-native';

import LyricsData from './lyricsData.json';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Lyrics from './Lyrics';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
// import {ALBUM_ART, SONG_BG_COLOR, SONG_LENGTH, THRESHOLD} from '../constants';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function LyricsPage() {
  const {height} = useWindowDimensions();
  const seekTime = useSharedValue(0);
  const isPlaying = useSharedValue(false);
  const halfScrollComponentHeight = 0.3 * height;

  const [heights, setHeights] = useState<number[]>(
    new Array(LyricsData.lyrics.lines.length).fill(0),
  );

  const lyricsScrollValue = useDerivedValue(() => {
    const sumOfHeights = (index: number) => {
      let sum = 0;
      for (let i = 0; i < index; ++i) {
        sum += heights[i];
      }
      return sum;
    };

    if (seekTime.value < LyricsData.lyrics.lines[0].time - THRESHOLD) {
      return 0;
    }
    // Don't go till last. or the screen would be left empty
    for (let index = 1; index < LyricsData.lyrics.lines.length - 2; index++) {
      const currTime = LyricsData.lyrics.lines[index].time;
      const lastTime = LyricsData.lyrics.lines[index - 1].time;
      if (seekTime.value > lastTime && seekTime.value < currTime - THRESHOLD) {
        return sumOfHeights(index - 1);
      } else if (seekTime.value < currTime) {
        return withTiming(sumOfHeights(index), {
          duration: THRESHOLD,
          easing: Easing.quad,
        });
      }
    }
    return sumOfHeights(LyricsData.lyrics.lines.length - 2);
  }, [heights]);

  const scrollViewStyle = useAnimatedStyle(() => {
    // In spotify the scroll happens only after half of the screen
    return {
      transform: [
        {
          translateY:
            lyricsScrollValue.value > halfScrollComponentHeight
              ? -lyricsScrollValue.value + halfScrollComponentHeight
              : 0,
        },
      ],
    };
  });

  console.log(scrollViewStyle);
  console.log(lyricsScrollValue.value);

  const topGradientStyle = useAnimatedStyle(() => {
    if (lyricsScrollValue.value > halfScrollComponentHeight) {
      return {
        opacity: withTiming(1, {
          duration: 300,
        }),
      };
    }
    return {
      opacity: 0,
    };
  });

  const startPlaying = () => {
    'worklet';
    isPlaying.value = true;
    seekTime.value = withTiming(SONG_LENGTH, {
      duration: SONG_LENGTH,
      easing: Easing.linear,
    });
  };
  // Function to stop song from playing
  const stopPlaying = () => {
    'worklet';
    // TODO add logic for pausing the animation
    isPlaying.value = false;
    cancelAnimation(seekTime);
  };

  useEffect(() => {
    // Check if all the heights are greater than zero or else quit early;
    for (let i = 0; i < heights.length; ++i) {
      if (heights[i] === 0) {
        return;
      }
    }
    console.log('Ready');
  }, [heights]);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.songDetailsContainer}>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <Image
            source={{uri: ALBUM_ART}}
            style={{
              height: 0.12 * height,
              width: 0.12 * height,
            }}
          />
        </View>
        <View style={styles.songNameContainer}>
          <Text style={styles.songName}>Save Your Tears (with ...</Text>
          <Text style={styles.songAuthor}>The Weeknd</Text>
        </View>
      </View>
      <AnimatedLinearGradient
        colors={[SONG_BG_COLOR, 'transparent']}
        style={[styles.topGradientStyle, topGradientStyle]}
      />
      <Animated.ScrollView
        style={styles.scrollvView}
        overScrollMode={'never'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        <Animated.View style={scrollViewStyle}>
          {LyricsData.lyrics.lines.map((line, index) => {
            return (
              <View
                key={`${line.time}_${line.words.join('_')}`}
                onLayout={event => {
                  const {height: layoutHeight} = event.nativeEvent.layout;
                  setHeights(prevHeights => {
                    if (
                      !prevHeights[index] ||
                      prevHeights[index] !== layoutHeight
                    ) {
                      prevHeights[index] = layoutHeight;
                      return [...prevHeights];
                    } else {
                      return prevHeights;
                    }
                  });
                }}>
                <Lyrics data={line} seekTime={seekTime} />
              </View>
            );
          })}
          <View style={{height: 0.3 * height}} />
        </Animated.View>
      </Animated.ScrollView>
      <LinearGradient
        colors={['transparent', SONG_BG_COLOR]}
        style={styles.bottomGradientStyle}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (isPlaying.value) {
                stopPlaying();
              } else {
                startPlaying();
              }
            }}>
            <Text>sdhfjh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// in miliseconds
export const SONG_LENGTH = 191000 as const;
const SONG_BG_COLOR = '#D63A12' as const;
export const DARK_LYRICS_COLOR = '#772E0E' as const;
export const ALBUM_ART =
  'https://i.scdn.co/image/ab67616d00001e02764ac25ee0d41190d513475a' as const;

export const THRESHOLD = 150 as const;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SONG_BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  scrollvView: {
    backgroundColor: SONG_BG_COLOR,
    width: '100%',
    paddingHorizontal: '5%',
  },
  songDetailsContainer: {
    height: '20%',
    padding: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    height: '20%',
    padding: '5%',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  songNameContainer: {
    marginLeft: '5%',
    display: 'flex',
  },
  songAuthor: {
    color: 'white',
    paddingTop: 10,
    fontFamily: 'Gotham-Book',
  },
  songName: {
    color: 'white',
    fontFamily: 'Gotham-Medium',
    fontSize: 18,
  },
  bottomGradientStyle: {
    height: '7%',
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: '76%',
  },
  topGradientStyle: {
    height: '7%',
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: '22%',
    zIndex: 2,
  },
});
