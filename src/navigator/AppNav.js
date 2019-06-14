import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import HomeScreen from '../pages/Home';
import WebScreen from '../pages/web/WebView';
import Tag from '../pages/my/Tag';
import Theme from '../pages/my/Theme';
import Search from '../pages/popular/Search';

const pageNav = createStackNavigator(
  {
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null
    //   })
    // },
    Web: {
      screen: WebScreen,
      navigationOptions: ({ navigation }) => ({
      })
    },
    Tag: {
      screen: Tag,
      navigationOptions: ({ navigation }) => ({
      })
    },
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
      })
    },
    Theme: {
      screen: Theme,
      navigationOptions: ({ navigation }) => ({
      })
    }
  },
  {
    initialRouteName: 'Home',
    initialRouteParams: {
      oneSceneNum: 0,
      title: '最热'
    }
  }
);

const AppNav = createSwitchNavigator({
  Home: HomeScreen,
  Page: pageNav
});


export default AppNav;
