import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const GenerateReel = ({navigation, route}: any) => {
  const item = route.params;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef<any>(null);

  const onBuffer = (buffer: any) => {
    console.log('buffring', buffer);
  };
  const onError = (error: any) => {
    console.log('error', error);
  };

  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(item.isLike);

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
        onPress={() => navigation.navigate('MySongList')}
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
          repeat={true}
          resizeMode="cover"
          // paused={currentIndex == index ? false : true}
          source={{uri: item.video}}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
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
      {/* <View
        style={{
          position: 'absolute',
          bottom: '10%', //edited
          right: 0,
        }}>
        <TouchableOpacity onPress={() => setLike(!like)} style={{padding: 10}}>
          <AntDesign
            name={'heart'}
            size={40}
            color={like ? '#F780FB' : '#361145'}
            style={{
              fontSize: 40,
            }}
          />

          <Text style={{color: 'white'}}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 10}}>
          <Ionicons
            name={'bookmark'}
            size={40}
            color={like ? '#F780FB' : '#361145'}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default GenerateReel;
