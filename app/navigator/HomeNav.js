import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Popular from '../view/Popular';

const homeIcon = require('../assets/ic_trending_up.png');
const homeIconActive = require('../assets/ic_trending_up_active.png');

const HomeNav = TabNavigator({
  Popular: {
    screen: Popular,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="trending-up"
          color={tintColor}
          size={25}
        />
      ),
    },
  },
  Favorite: {
    screen: Popular,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="favorite-border"
          color={tintColor}
          size={25}
        />
      ),
    }
  },
}, {
  tabBarPosition:'bottom',
  // animationEnabled: false,
  lazy: true,
  // scrollEnabled: false,
  tabBarOptions: {
    swipeEnabled: false,
    activeTintColor: '#2196F3',
    inactiveTintColor:'#666666',
    showLabel:false,
    showIcon:true,
    indicatorStyle:{height:0},
    style: {
      backgroundColor:'#ffffff',
    }
  },
});

const styles = StyleSheet.create({
  tabIcon: {
    width: 50,
    height: 50,
  },
});

export default HomeNav;
