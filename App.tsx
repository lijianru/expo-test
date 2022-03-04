import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { customTheme } from './src/constants/customTheme';

import { useCachedResources } from './src/hooks/useCachedResources';
import { Navigation } from './src/navigation';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}

export default App;
