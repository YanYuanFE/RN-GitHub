/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import HotUpdate, {ImmediateCheckCodePush} from 'react-native-code-push-dialog';
import AppNav from './src/navigator/AppNav';
import ThemeService from './src/services/ThemeService';
import {ThemeProvider} from './src/context/themeContext';

const themeService = new ThemeService();

const App = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    getTheme();
    const listener = DeviceEventEmitter.addListener('THEME_CHANGED', getTheme);
    // ImmediateCheckCodePush();
    return () => {
      listener && listener.remove();
    };
  }, []);

  const getTheme = () => {
    themeService.getTheme().then((data) => {
      setTheme(data);
    });
  };

  if (!theme) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider value={{primary: theme}}>
          {/*<HotUpdate isActiveCheck={false} />*/}
          <AppNav />
        </ThemeProvider>
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
