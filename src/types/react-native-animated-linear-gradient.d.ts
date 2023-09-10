declare module 'react-native-animated-linear-gradient' {
  import {Component} from 'react';

  interface AnimatedLinearGradientProps {
    // Define the props and their types here
    // For example:

    customColors: string[];
    speed: string | number;
    start?: {x: number; y: number};
    end?: {x: number; y: number};
  }

  export default class AnimatedLinearGradient extends Component<AnimatedLinearGradientProps> {}
}
