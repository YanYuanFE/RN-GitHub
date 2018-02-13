import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import Home from '../view/Home';
import Toolbar from '../components/Toolbar';

const AppNav = StackNavigator({
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
