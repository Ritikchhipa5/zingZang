import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
// import {videoData} from './Database';
import SingleReel from './SingleReel';
import {getAllVideos} from '../api/reels';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {Images} from '../constant/Images';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const navigation: any = useNavigation();
  const handleChangeIndexValue = ({index}: any) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    getAllVideos().then(async data => {
      const convertedData = await data.data.map((item: any, index: any) => {
        return {
          id: index,
          video: item.M.link.S,
          title: item.M.title.S,
          description: item.M.description.S,
          likes: item.M.likes,
          isLike: false,
          videoID: item.M.videoID.S,
          ownerID: item.M.ownerID.S,
        };
      });

      setVideos(convertedData);
    });
  }, []);

  return videos?.length ? (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videos}
      renderItem={({item, index}: any) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item: any, index: any) => index}
    />
  ) : (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_2}>
      <AnimatedLinearGradient
        customColors={[
          // 'rgb(64, 81, 187)',
          'rgba(69, 118, 253, 1)',
          'rgb(59, 49, 128)',
          'rgb(58, 41, 113)',
          'rgb(56, 29, 91)',
          'rgb(55, 24, 82)',
          'rgb(54, 17, 69)',
        ]}
        speed={1500}
      />
      <SafeAreaView>
        <View className="flex flex-row items-center justify-center px-4">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => navigation.navigate('CreateProject')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="items-start text-2xl font-semibold text-center text-white ">
            Reels
          </Text>
          {/* <TouchableOpacity className="" onPress={() => handleReload()}>
            <Entypo color="white" name="dots-three-horizontal" size={32} />
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
      <View className="items-center justify-center flex-1 h-full ">
        <Text className="text-xl font-semibold text-white ">
          Reels ☹️ is not available
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ReelsComponent;
