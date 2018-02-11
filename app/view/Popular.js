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

class PopularTabItem extends Component {
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
    const { routeName } = this.props.navigation.state;
    console.log(this.props.navigation);
    fetchPopularRepo(routeName)
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
    return <View style={styles.tabContainer}>
      <Text>1111</Text>
    </View>
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const PopularTab = TabNavigator({
  Java: { screen: HomeScreen },
  JavaScript: { screen: SettingsScreen },
}, {
  tabBarPosition: 'top',
  animationEnabled: false,
  scrollEnabled: false,
  lazy: true,
  tabBarOptions: {
    scrollEnabled: false,
  }
});

export default class Popular extends Component {
  render() {
    return (
      <PopularTab/>
    )
  }
}


{/*<View style={styles.container}>*/}
  {/*<ScrollableTabView*/}
    {/*initialPage={0}*/}
    {/*renderTabBar={() => <ScrollableTabBar/>}*/}
    {/*tabBarBackgroundColor="#2196F3"*/}
    {/*tabBarActiveTextColor="#FFF"*/}
    {/*tabBarInactiveTextColor="#FFF"*/}
    {/*tabBarUnderlineStyle={{backgroundColor: '#FFF'}}*/}
  {/*>*/}
    {/*<PopularTab tabLabel="Java">Java</PopularTab>*/}
    {/*<PopularTab tabLabel="JavaScript">JavaScript</PopularTab>*/}
    {/*<PopularTab tabLabel="Android">Android</PopularTab>*/}
    {/*<PopularTab tabLabel="IOS">IOS</PopularTab>*/}
  {/*</ScrollableTabView>*/}
{/*</View>;*/}

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
