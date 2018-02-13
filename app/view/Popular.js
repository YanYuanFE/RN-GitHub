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

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    fetchPopularRepo(this.props.tabLabel)
      .then(result => {
        console.log(JSON.stringify(result));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items)
        });
      }).catch((error) => {
      console.log(error);
    })
  }

  renderRow(data) {
    return <RepoCell data={data} />
  }

  render() {
    return <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => this.renderRow(data)}
      >
      </ListView>
    </View>
  }
}

export default class Popular extends Component {
  render() {
    let navigationBar =
      <NavigationBar
        title={'最热'}
        statusBar={{backgroundColor: '#2196F3'}}
      />
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar/>}
          tabBarBackgroundColor="#2196F3"
          tabBarActiveTextColor="#FFF"
          tabBarInactiveTextColor="#FFF"
          tabBarUnderlineStyle={{backgroundColor: '#FFF'}}
          >
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="IOS">IOS</PopularTab>
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
