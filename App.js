/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent, createContext } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
} from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import HotUpdate, { ImmediateCheckCodePush } from 'react-native-code-push-dialog';
import AppNav from './src/navigator/AppNav';
import NavigationService from './src/services/NavigationService';
import ThemeService from "./src/services/ThemeService";
import { ThemeContext } from './src/context/themeContext';

const themeService = new ThemeService();

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    theme: null
  };

  componentDidMount() {
    ImmediateCheckCodePush();
    this.getTheme();
    this.listener = DeviceEventEmitter.addListener('THEME_CHANGED', this.getTheme);
  }

  componentWillUnmount(): void {
    this.listener && this.listener.remove();
  }

  getTheme = () => {
    themeService.getTheme().then(data => {
      this.setState({theme: data});
    })
  };

  render() {
    const { theme } = this.state;
    if (!theme) {
      return null;
    }
    console.log(AppNav)
    const AppContainer = createAppContainer(AppNav);
    return (
      <ThemeContext.Provider value={{theme}}>
        <HotUpdate isActiveCheck={false} />
        <AppContainer
          screenProps={{ theme }}
          ref={navigationRef => NavigationService.setTopLevelNavigator(navigationRef)}
        />
      </ThemeContext.Provider>
    )
  }
}

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
