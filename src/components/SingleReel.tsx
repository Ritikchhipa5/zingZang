import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {likeVideo, saveVideo, unSaveVideo, unlikeVideo} from '../api/reels';
import {useSelector} from 'react-redux';
const SingleReel = ({item, index, currentIndex}: any) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation: any = useNavigation();
  const videoRef = useRef<any>(null);

  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const user: any = useSelector((state: any) => state?.userData)?.user;

  useEffect(() => {
    if (user) {
      const likesArray = item?.likes.L.map((item: any) => item.S);
      setLike(likesArray?.includes(user?.user?.id));
    }
  }, [user]);

  const onBuffer = (buffer: any) => {
    console.log('buffring', buffer);
  };
  const onError = (error: any) => {
    console.log('error', error);
  };
  const handleLikeVideo = async (data: any) => {
    let isLike = await likeVideo(data);
    if (isLike?.status) {
      setLike(true);
    }
  };
  const handleDisLikeVideo = async (data: any) => {
    let isLike = await unlikeVideo(data);
    if (isLike?.status) {
      setLike(false);
    }
  };

  const handleSaveVideo = async (data: any) => {
    let isSave = await saveVideo(data);
    if (isSave?.status) {
      setSave(true);
    }
  };

  const handleUnSaveVideo = async (data: any) => {
    let isSave = await unSaveVideo(data);

    if (isSave?.status) {
      setSave(false);
    }
  };

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProject')}
        className="absolute z-10 right-5 top-[10%]">
        <MaterialIcons color="white" name="close" size={32} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          resizeMode="cover"
          posterResizeMode="contain"
          poster="https://cdn.dribbble.com/users/886358/screenshots/2980235/loading.gif"
          repeat={true}
          // resizeMode=""
          paused={currentIndex == index ? false : true}
          source={{uri: item.video}}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'black',
          }}
        />
      </TouchableOpacity>

      {mute && (
        <View
          style={{
            backgroundColor: 'rgba(52,52,52,0.6)',
            borderRadius: 100,
          }}>
          <Ionicons
            name="volume-mute-outline"
            style={{
              fontSize: 30,
              color: 'white',
              padding: mute ? 20 : 0,
            }}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          width: windowWidth,
          zIndex: 1,
          bottom: 0, //edited
          padding: 10,
        }}>
        <View style={{}}>
          <TouchableOpacity style={{width: 150, marginBottom: 30}}>
            <View
              style={{width: 100, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  margin: 10,
                }}>
                <Image
                  source={item.postProfile}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={{color: 'white', fontSize: 16}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '10%', //edited
          right: 0,
        }}>
        <TouchableOpacity
          onPress={async () => {
            try {
              if (like) {
                handleDisLikeVideo({
                  id: user?.user?.id,
                  videoID: item?.videoID,
                  ownerID: item?.ownerID,
                });
              } else {
                handleLikeVideo({
                  id: user?.user?.id,
                  videoID: item?.videoID,
                  ownerID: item?.ownerID,
                });
              }
            } catch (error) {}
          }}
          style={{padding: 10}}>
          <AntDesign
            name={'heart'}
            size={40}
            color={like ? '#F780FB' : '#361145'}
            style={{
              fontSize: 40,
            }}
          />

          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '800',
              marginTop: 3,
            }}>
            {item.likes?.L?.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              if (save) {
                handleUnSaveVideo({
                  id: user?.user?.id,
                  videoID: item?.videoID,
                  ownerID: item?.ownerID,
                });
              } else {
                handleSaveVideo({
                  id: user?.user?.id,
                  videoID: item?.videoID,
                  ownerID: item?.ownerID,
                });
              }
            } catch (error) {}
          }}
          style={{padding: 10}}>
          <Ionicons
            name={'bookmark'}
            size={40}
            color={save ? '#F780FB' : '#361145'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleReel;
