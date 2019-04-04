/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNav from './src/navigator/AppNav';
import NavigationService from './src/services/NavigationService';
// import Popular from './src/view/Popular';

const AppContainer = createAppContainer(AppNav);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer ref={navigationRef => NavigationService.setTopLevelNavigator(navigationRef)} />
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
