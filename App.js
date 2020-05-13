/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appearance, useColorScheme} from 'react-native-appearance';
import AppNav from './src/navigator/AppNav';
import ThemeService from './src/services/ThemeService';

const themeService = new ThemeService();

const getAppTheme = (scheme, primary) => {
  const Theme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...Theme,
    colors: {
      ...Theme.colors,
      primary: primary,
    },
  };
};

Appearance.getColorScheme();

const App = () => {
  const [theme, setTheme] = useState(null);
  const scheme = useColorScheme();
  console.log(theme);

  useEffect(() => {
    getTheme();
    const listener = DeviceEventEmitter.addListener('THEME_CHANGED', getTheme);
    return () => {
      listener && listener.remove();
    };
  }, [getTheme]);

  const getTheme = useCallback(() => {
    themeService.getTheme().then((data) => {
      setTheme(getAppTheme(scheme, data));
    });
  }, [scheme]);

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

const subscription = Appearance.addChangeListener(({colorScheme}) => {
  // do something with color scheme
});

subscription.remove();

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
