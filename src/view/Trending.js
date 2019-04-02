import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';

import RepoCell from '../components/RepoCell';
import NavigationBar from '../components/NavigationBar';


export default class Trending extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{backgroundColor: "#FFF"}}
          title={'最热'}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        <Text>Trending</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex:1,
    backgroundColor: 'red'
  },
  tabList: {
    height:600
  }
})
