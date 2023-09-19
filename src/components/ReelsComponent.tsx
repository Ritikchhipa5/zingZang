import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
// import {videoData} from './Database';
import SingleReel from './SingleReel';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({index}: any) => {
    setCurrentIndex(index);
  };

  const posts = [
    {
      id: 0,
      video:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Ram_Charan',
      description: 'Feel the buity of nature',
      likes: '245k',
      isLike: false,
    },
    {
      id: 1,
      video:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Ram_Charan',
      description: 'Feel the buity of nature',
      likes: '245k',
      isLike: false,
    },
    {
      id: 2,
      video:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'Ram_Charan',
      description: 'Feel the buity of nature',
      likes: '245k',
      isLike: false,
    },
    {
      id: 3,
      video:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'Ram_Charan',
      description: 'Feel the buity of nature',
      likes: '245k',
      isLike: false,
    },
    {
      id: 4,
      video: 'https://samplelib.com/lib/preview/mp3/sample-6s.mp3',
      title: 'Ram_Charan',
      description: 'Feel the buity of nature',
      likes: '245k',
      isLike: false,
    },
  ];
  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={posts}
      renderItem={({item, index}: any) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item: any, index: any) => index}
    />
  );
};

export default ReelsComponent;
