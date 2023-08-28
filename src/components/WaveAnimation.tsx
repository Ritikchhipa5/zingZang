import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {Text, View} from 'react-native';

export default function WaveAnimation() {
  const animationRef = useRef<LottieView>(null);

  return (
    <>
      <LottieView
        style={{height: '100%', width: '100%'}}
        ref={animationRef}
        source={require('./animation.json')}
        autoPlay
        loop
      />
    </>
  );
}
