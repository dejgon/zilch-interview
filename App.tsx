import React, { useCallback } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

import {
  ConfigCatProvider,
  createConsoleLogger,
  LogLevel,
} from 'configcat-react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';

import { Routing } from './routes/Routing';
import { store } from './store';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded] = useFonts({
    'Oswald-Light': require('./assets/fonts/Oswald-Light.ttf'),
    'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
  });

  const logger = createConsoleLogger(LogLevel.Info);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
      onLayout={onLayoutRootView}>
      <ConfigCatProvider
        // This SDK key obviously should be kept within .env file and never pushed into the repo, but for the assignment/interview purposes I left it in here, so it doesn't throw errors
        sdkKey="dCjbCD4gFkGP9cUgE3R9Jw/jqKq_APPek6BdQQxchYEuA"
        options={{ logger }}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </ConfigCatProvider>
    </SafeAreaView>
  );
}

export default App;
