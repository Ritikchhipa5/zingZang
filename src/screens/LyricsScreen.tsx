import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, FlatList, ImageBackground} from 'react-native';
import LyricsData from './lyricsData.json';
import Animated from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../constant/Images';
export default function LyricsPage() {
  const [countDown, setCountDown] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  return (
    // <View style={styles.container}>
    //   {/* <StatusBar style="auto" /> */}
    //   <View style={styles.songDetailsContainer}>
    //     <View
    //       style={{
    //         shadowColor: '#000',
    //         shadowOffset: {
    //           width: 0,
    //           height: 5,
    //         },
    //         shadowOpacity: 0.34,
    //         shadowRadius: 6.27,

    //         elevation: 10,
    //       }}>
    //       <Image
    //         source={{uri: ALBUM_ART}}
    //         style={{
    //           height: 0.12 * height,
    //           width: 0.12 * height,
    //         }}
    //       />
    //     </View>
    //     <View style={styles.songNameContainer}>
    //       <Text style={styles.songName}>Save Your Tears (with ...</Text>
    //       <Text style={styles.songAuthor}>The Weeknd</Text>
    //     </View>
    //   </View>
    //   <AnimatedLinearGradient
    //     colors={[SONG_BG_COLOR, 'transparent']}
    //     style={[styles.topGradientStyle, topGradientStyle]}
    //   />
    //   <Animated.ScrollView
    //     style={styles.scrollvView}
    //     overScrollMode={'never'}
    //     showsVerticalScrollIndicator={false}
    //     scrollEnabled={false}>
    //     <Animated.View style={scrollViewStyle}>
    //       {LyricsData.lyrics.lines.map((line, index) => {
    //         return (
    //           <View
    //             key={`${line.time}_${line.words.join('_')}`}
    //             onLayout={event => {
    //               const {height: layoutHeight} = event.nativeEvent.layout;
    //               setHeights(prevHeights => {
    //                 if (
    //                   !prevHeights[index] ||
    //                   prevHeights[index] !== layoutHeight
    //                 ) {
    //                   prevHeights[index] = layoutHeight;
    //                   return [...prevHeights];
    //                 } else {
    //                   return prevHeights;
    //                 }
    //               });
    //             }}>
    //             <Lyrics data={line} seekTime={seekTime} />
    //           </View>
    //         );
    //       })}
    //       <View style={{height: 0.3 * height}} />
    //     </Animated.View>
    //   </Animated.ScrollView>
    //   <LinearGradient
    //     colors={['transparent', SONG_BG_COLOR]}
    //     style={styles.bottomGradientStyle}
    //   />
    //   <View style={styles.bottomContainer}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           if (isPlaying.value) {
    //             stopPlaying();
    //           } else {
    //             startPlaying();
    //           }
    //         }}>
    //         <Text>sdhfjh</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
    <SafeAreaView edges={['left', 'right']}>
      {/* <LyricsFlatList currentTime={countDown} /> */}
    </SafeAreaView>
  );
}
