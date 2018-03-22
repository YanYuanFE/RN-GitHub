import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import { fetchPopularRepo } from '../api/popular';

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
    const navigationBar =
      <NavigationBar
        title={'最热'}
        statusBar={{backgroundColor: '#2196F3'}}
      />
    console.log(navigationBar);
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollableTabView
          style={{marginTop: 20, }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Text tabLabel='Tab #1'>My</Text>
          <Text tabLabel='Tab #2 word word'>favorite</Text>
          <Text tabLabel='Tab #3 word word word'>project</Text>
          <Text tabLabel='Tab #4 word word word word'>favorite</Text>
          <Text tabLabel='Tab #5'>project</Text>
        </ScrollableTabView>
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
