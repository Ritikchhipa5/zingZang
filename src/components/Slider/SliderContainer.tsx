import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';
import {Image, View} from 'react-native';
import {Images} from '../../constant/Images';

export const SliderContainer = (props: {
  caption?: string;
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
  vertical?: boolean;
}) => {
  //console.log(`<<<<<< thumbsecond style = ${thumbSecondStyle}`);
  const DEFAULT_VALUE = 0.2;
  const {caption, sliderValue, trackMarks} = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE,
  );
  // useEffect(() => {
  //   console.log(`\n\n Slider Values  = ${value}`);
  // }, [value]);
  var renderTrackMarkComponent: any;
  const borderWidth = 4;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? {borderColor: 'red', borderWidth, left: -borderWidth / 2}
          : {borderColor: 'grey', borderWidth, left: -borderWidth / 2};
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(
      props.children,
      (child: React.ReactElement, index: number) => {
        if (!!child && child.type === Slider) {
          return React.cloneElement(child, {
            onValueChange: setValue,
            renderTrackMarkComponent,
            trackMarks,
            value,
          });
        }

        return child;
      },
    );
  };

  return (
    <View style={{paddingVertical: 16}}>
      <View
        style={{
          backgroundColor: '#27132b',
          paddingVertical: 4,
        }}>
        <Image
          style={{
            height: 45,
            width: 264,
            zIndex: 1,
            resizeMode: 'cover',
          }}
          source={Images.WAVES}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '30%',
          height: 45 + 8,
          width: 264 + 16,
          marginLeft: -8,
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: '#27132b',
        }}>
        {renderChildren()}
      </View>
    </View>
  );
};
