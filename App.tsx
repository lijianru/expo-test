import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { customTheme } from './src/constants/customTheme';
import { useCachedResources } from './src/hooks/useCachedResources';
import { Navigation } from './src/navigation';
import { store } from './src/store';

function App() {
  const isLoadingComplete = useCachedResources();

  return (
    <Provider store={store}>
      {!isLoadingComplete ? null : (
        <NativeBaseProvider theme={customTheme}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      )}
    </Provider>
  );
}

export default App;
