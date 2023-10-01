/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player';
import TrackPlayer, {Event} from 'react-native-track-player';
import {SliderContainer} from './SliderContainer';
import {Slider} from '@miblanchard/react-native-slider';
import {ICONS_SVG} from '../../assets/svg/icons/Icon';

const audioRecorderPlayer: AudioRecorderPlayer = new AudioRecorderPlayer();
export const IndividualComp = ({
  data,
  selectSong,
  originalSong = false,
  updateSliderValue,
  sliderValues,
}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // audioRecorderPlayer.setSubscriptionDuration(0.09);
  const onStartPlay = async () => {
    try {
      console.log(sliderValues);

      if (!originalSong) {
        const msg = await audioRecorderPlayer.startPlayer(
          originalSong ? data[0]?.url : data[0]?.uri,
        );
        await audioRecorderPlayer.seekToPlayer(sliderValues.rec0 * 1000);
        const volume = await audioRecorderPlayer.setVolume(1.0);
        audioRecorderPlayer.addPlayBackListener(async (e: PlayBackType) => {
          if (e.currentPosition >= sliderValues.rec1 * 1000) {
            setIsPlaying(false);
            await audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
          } else {
            setIsPlaying(!(e.currentPosition === e.duration));
          }
          return;
        });
      } else {
        // Check the current state of the track player

        await TrackPlayer.play();
        TrackPlayer.addEventListener(
          Event.PlaybackProgressUpdated,
          async (e: any) => {
            console.log(e);
            if (e.position >= sliderValues?.original1) {
              // await TrackPlayer.pause();
            }
          },
        );

        // await TrackPlayer.seekTo(sliderValues?.original0);
        // // Seek to the specified original0 position
      }

      setIsPlaying(true);
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };
  const onPausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false);
  };
  const onStopPlay = async (): Promise<void> => {
    if (!originalSong) {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    } else {
      // await TrackPlayer.reset();
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
  return (
    <View>
      {data.map((res: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#27132b',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 8,
              paddingVertical: 4,
            }}>
            {/* <View
              className={`flex gap-x-3 p-3 
              flex-row
              my-4
              items-center justify-between bg-[#E174E41A] rounded-xl flex-1 ${
                value === res.key
                  ? 'border-2 border-[#F780FB]'
                  : 'border-2 border-transparent'
              } `}> */}
            <View
              style={{
                width: '80%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'flex-end',
                // backgroundColor: '#ff0000',
              }}>
              <SliderContainer sliderValue={[0, 10]}>
                <Slider
                  animateTransitions
                  containerStyle={{
                    width: 264 + 16,
                    height: 24,
                  }}
                  onSlidingComplete={value => {
                    updateSliderValue(
                      originalSong
                        ? {
                            original0: value[0],
                            original1: value[1],
                          }
                        : {rec0: value[0], rec1: value[1]},
                    );
                  }}
                  maximumValue={res.duration ?? 100}
                  thumbTintColor={'#6af0f3'}
                  //minimumTrackTintColor={'#ff0000'}
                  minimumTrackTintColor="#ffffff88"
                  minimumValue={1}
                  //thumbImage={Images.PLAY}
                  //thumbImage={Images.PLAY}

                  step={1}
                  thumbStyle={{
                    width: 12,
                    height: 52,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  //thumbImage={Images.PLAY}
                  thumbTouchSize={{
                    width: 12,
                    height: 48,
                  }}
                  //thumbTintColor="#1a9274"
                  trackStyle={{
                    backgroundColor: '#00000011',
                    borderRadius: 1,
                    height: 52,
                  }}
                />
              </SliderContainer>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (isPlaying) {
                    onStopPlay();
                  } else {
                    selectSong(originalSong ? res?.url : res?.uri);
                    onStartPlay();
                    // setIsPlaying(true);
                  }
                }}>
                {isPlaying ? <ICONS_SVG.PAUSE /> : <ICONS_SVG.PLAY />}
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};
