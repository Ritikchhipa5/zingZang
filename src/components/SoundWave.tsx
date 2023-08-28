import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {Line, Rect, Svg} from 'react-native-svg';

const SoundWave = () => {
  return (
    <View>
      <Svg height="101" width="100%">
        <Line
          x1="3"
          y1="7.5"
          x2="3"
          y2="21"
          stroke={'green'}
          strokeWidth="4"
          markerEnd="url(#arrow)"
        />
        <Line
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          stroke={'green'}
          strokeWidth="4"
          markerEnd="url(#arrow)"
        />
        <Line
          x1="21"
          y1="7.5"
          x2="21"
          y2="21"
          stroke={'green'}
          strokeWidth="4"
          markerEnd="url(#arrow)"
        />
      </Svg>
    </View>
  );
};

export default SoundWave;
