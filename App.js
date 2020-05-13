/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNav from './src/navigator/AppNav';
import ThemeService from './src/services/ThemeService';

const themeService = new ThemeService();

const getAppTheme = (primary) => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: primary,
    },
  }
}

const App = () => {
  const [theme, setTheme] = useState(null);
  console.log(DefaultTheme);

  useEffect(() => {
    getTheme();
    const listener = DeviceEventEmitter.addListener('THEME_CHANGED', getTheme);
    return () => {
      listener && listener.remove();
    };
  }, []);

  const getTheme = () => {
    themeService.getTheme().then((data) => {
      setTheme(getAppTheme(data));
    });
  };

  if (!theme) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <AppNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
