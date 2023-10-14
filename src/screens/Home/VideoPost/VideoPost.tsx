import {View} from 'react-native';
import React from 'react';
import ReelsComponent from '../../../components/ReelsComponent';
import {TouchableOpacity} from 'react-native';
import {ICONS_SVG} from '../../../assets/svg/icons/Icon';
const Reels = ({navigation}: any) => {
  return (
    <View className="h-full">
      <ReelsComponent />
      <View className="flex items-center flex-row justify-between px-16 py-5 bg-[#190D1A] ">
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('CreateProject');
          }}>
          <ICONS_SVG.HOME />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.navigate('Reels')}>
          <ICONS_SVG.BLOB />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation?.replace('Setting');
          }}>
          <ICONS_SVG.USER />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reels;
