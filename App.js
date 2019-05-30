/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent, Provider } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNav from './src/navigator/AppNav';
import NavigationService from './src/services/NavigationService';

const AppContainer = createAppContainer(AppNav);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    theme: ''
  }

  render() {
    const { theme } = this.state;
    return (
      <Provider value={{theme}}>
        <AppContainer
          ref={navigationRef => NavigationService.setTopLevelNavigator(navigationRef)} 
        />
      </Provider>
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
