import React, { PureComponent } from 'react';
import {
  StyleSheet,
} from 'react-native';

import HomeNav from '../navigator/HomeNav';

export default class HomeScreen extends PureComponent {

  render() {
    return (
      <HomeNav
        screenProps = {{appNavigation: this.props.navigation}}
        style = {{flex: 1}}
      />
    )
  }
}
