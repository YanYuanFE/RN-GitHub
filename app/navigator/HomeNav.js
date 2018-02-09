import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import Popular from '../view/Popular';

const homeIcon = require('../assets/ic_trending_up.png');
const homeIconActive = require('../assets/ic_trending_up_active.png');

const HomeNav = TabNavigator({
  Popular: {
    screen: Popular,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={focused ? homeIconActive : homeIcon}
          style={[styles.tabIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
}, {
  tabBarPosition:'bottom',
  tabBarOptions: {
    activeTintColor: '#000000',
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
