import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {lyricsString} from '../../../service/lyricsService';

import {connect} from 'react-redux';
import {addLyrics} from '../../../actions/record';
interface Props {
  items: string[];
  onIndexChange: (index: number) => void;
  itemHeight: number;
  updateLyrics: string[];
  setUpdateLyrics: (index: string[]) => void;
}

function LyricsPlayer({navigation, addLyric, lyrics}: any) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [updateLyrics, setUpdateLyrics] = useState<string[]>([]);
  const handleIndexChange = (index: any) => {
    setSelectedItemIndex(index);
  };
  useEffect(() => {
    setUpdateLyrics(lyricsString);
  }, []);

  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      {/* <Loading /> */}
      <ImageBackground
        style={{height: heightPercentageToDP('100%')}}
        source={Images.BG_1}>
        <SafeAreaView
          className="h-full "
          edges={['right', 'left', 'top', 'bottom']}>
          {/* // Search Box */}
          <View className="flex flex-row items-center justify-between px-4">
            <TouchableOpacity
              className=""
              onPress={() => navigation.goBack(' ')}>
              <MaterialIcons
                color="white"
                name="keyboard-arrow-left"
                size={42}
              />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-center text-white ">
              Custom lyrics
            </Text>

            <TouchableOpacity className="">
              <MaterialIcons color="white" name="close" size={32} />
            </TouchableOpacity>
          </View>
          <View className="flex-1 p-4">
            <Text className="text-[#C6C3C6] text-xl font-medium text-center ">
              Click on the text of the song to customize the lyrics
            </Text>
            <View className="justify-center flex-1 ">
              <WheelPicker
                items={lyricsString}
                onIndexChange={handleIndexChange}
                setUpdateLyrics={setUpdateLyrics}
                updateLyrics={updateLyrics}
                itemHeight={50} // Adjust this value based on your design
              />
            </View>
          </View>
          <View className="gap-y-3">
            <TouchableOpacity
              className="px-4 "
              activeOpacity={0.7}
              onPress={() => {
                addLyric(updateLyrics);
                navigation.navigate('RecordScreen');
              }}>
              <View className={`py-4 bg-[#F780FB] rounded-full `}>
                <Text className="text-xl font-semibold text-center text-black">
                  Start Singing
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 "
              activeOpacity={0.7}
              onPress={() => {
                addLyric(lyricsString);
                setUpdateLyrics(lyricsString);
                navigation.navigate('RecordScreen');
              }}>
              <View className={`py-4 border-[#F780FB] border-2 rounded-full `}>
                <Text className="text-xl font-semibold text-center text-[#F780FB]">
                  Reset Changes
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

const WheelPicker: React.FC<Props> = props => {
  const {items, onIndexChange, itemHeight}: any = props;
  const [index, setIndex] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const flatRef = useRef<FlatList>(null);

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const inputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5], // Adjust these values as needed
      extrapolate: 'clamp',
    });

    return (
      <>
        <Animated.View
          style={[
            {
              // height: itemHeight,
              width: '100%',
              // transform: [{scale}],
            },
            styles.animatedContainer,
          ]}>
          <TextInput
            onChangeText={(value: string) => {
              handleTextInputChange(index, value);
            }}
            multiline
            value={props.updateLyrics[index]}
            placeholderTextColor="#fff"
            className="w-full py-3  text-xl font-bold text-center bg-[#FFFFFF1A] text-white rounded-md  items-center leading-2 px-5"
            style={{
              // height: itemHeight,

              width: '100%',
              // transform: [{scale}],
            }}
          />
        </Animated.View>
      </>
    );
  };

  const handleTextInputChange = (index: number, newText: string) => {
    let data = [...props.updateLyrics];
    data[index] = newText;
    props.setUpdateLyrics(data);
  };
  const modifiedItems = [...props.updateLyrics];

  const momentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index);
  };

  return (
    <View style={{height: itemHeight * 2.4}} className="w-full">
      <Animated.FlatList
        data={modifiedItems}
        ref={flatRef}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
      {/* <View style={[styles.indicatorHolder, {top: itemHeight}]}>
        <View style={[styles.indicator]} />
        <View style={[styles.indicator, {marginTop: itemHeight}]} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
  },
  indicatorHolder: {
    position: 'absolute',
  },
  indicator: {
    width: 1200,
    height: 1,
    backgroundColor: '#000',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 18,
  },
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addLyric: (value: any) => {
      dispatch(addLyrics(value));
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    lyrics: state.records?.lyrics,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LyricsPlayer);
