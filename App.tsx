import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
