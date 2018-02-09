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
  View,
  Image
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
    </View>
);

const App = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('./res/images/ic_polular.png')}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('./res/images/ic_trending.png')}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
});

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
