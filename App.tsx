import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SetupPlayer} from './src/service/trackPlayerServices';

function App() {
  useEffect(() => {
    let initialize = SetupPlayer();
    console.log('SetupPlayer', initialize);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StackNavigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
