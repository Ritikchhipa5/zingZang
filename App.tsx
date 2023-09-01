import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import configureStore from './src/store';

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
