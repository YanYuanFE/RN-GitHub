import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import HomeNav from '../navigator/HomeNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/themeContext';

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({screenProps}) => {
    return {
      headerBackTitle: null,
    };
  };
  static contextType = ThemeContext;
  render() {
    const {theme} = this.context;
    const {screenProps, navigation} = this.props;
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme}]}>
        <HomeNav
          screenProps={{appNavigation: navigation, theme: screenProps.theme}}
          style={{flex: 1}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
