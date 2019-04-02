import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import Home from '../view/Home';
import Toolbar from '../components/Toolbar';

const AppNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
  initialRouteParams: {
    oneSceneNum: 0,
    title: '最热'
  }
});


export default AppNav;
