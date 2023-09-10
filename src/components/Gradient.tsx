import {StyleSheet, Button} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const START_DEFAULT = {x: 0.5, y: 0};
const END_DEFAULT = {x: 0.5, y: 1};
const START_HORIZONTAL = {x: 0, y: 0.5};
const END_HORIZONTAL = {x: 1, y: 0.5};
const GRADIENT_COLORS = [
  '#4576FD',
  '#361145',
  //   '#e8befa',
  //   '#acbfff',
  //   '#bbf3bf',
  //   '#fdf4c9',
  //   '#fbcdf2',
];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout: any = undefined;

export const infiniteRainbow = (setGradientOptions: any) => {
  if (setGradientOptions.locations[1] - MOVEMENT <= 0) {
    // Shift colors and reset locations
    let gradientColors = [...setGradientOptions.colors];
    gradientColors.shift();
    gradientColors.push(gradientColors[1]);

    setGradientOptions({
      colors: gradientColors,
      locations: GRADIENT_LOCATIONS,
      start: START_DEFAULT,
      end: END_DEFAULT,
    });
  } else {
    let updatedLocations = setGradientOptions.locations.map(
      (item: any, index: any) => {
        if (index === setGradientOptions.locations.length - 1) {
          return 1;
        }

        return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
      },
    );

    setGradientOptions({
      colors: [...setGradientOptions.colors],
      locations: updatedLocations,
      start: START_DEFAULT,
      end: END_DEFAULT,
    });
  }

  timeout = setTimeout(() => infiniteRainbow(setGradientOptions), INTERVAL);
};

export const reset = (setGradientOptions: any) => {
  // Stop existing animation
  if (timeout !== undefined) {
    clearTimeout(timeout);
    timeout = undefined;
  }

  setGradientOptions({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT,
  });
};

export default function Gradient({children}: any) {
  let [gradientOptions, setGradientOptions] = React.useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT,
  });

  // ... rest of your component code
  const slideClosed = (start: any, end: any) => {
    let updatedLocations = gradientOptions.locations.map(item => {
      return parseFloat(Math.min(1, item + MOVEMENT).toFixed(2));
    });

    setGradientOptions({
      colors: [...gradientOptions.colors],
      locations: updatedLocations,
      start: start,
      end: end,
    });

    if (!updatedLocations.every(item => item === 1)) {
      timeout = setTimeout(() => slideClosed(start, end), INTERVAL);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={gradientOptions.colors}
      locations={gradientOptions.locations}
      start={gradientOptions.start}
      end={gradientOptions.end}>
      <Button
        title="Slide Down"
        onPress={() => slideClosed(START_DEFAULT, END_DEFAULT)}
      />
      <Button
        title="Slide Right"
        onPress={() => slideClosed(START_HORIZONTAL, END_HORIZONTAL)}
      />
      <Button
        title="Infinite"
        onPress={() => infiniteRainbow(setGradientOptions)}
      />
      <Button title="Reset" onPress={() => reset(setGradientOptions)} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
