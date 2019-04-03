import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';

import TrendingRepo from '../components/TrendingRepo';
import NavigationBar from '../components/NavigationBar';
import RepositoryService, { TYPE } from '../services/RepositoryService';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";

const trendingService = new RepositoryService(TYPE.Trending);

const JavaRoute = () => <TrendingTab tabLabel="Java">Java</TrendingTab>;
const JSRoute = () => <TrendingTab tabLabel="JavaScript">JavaScript</TrendingTab>;

export default class Trending extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'Java', title: 'Java' },
      { key: 'JavaScript', title: 'JavaScript' },
    ],
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{backgroundColor: "#FFF"}}
          title={'趋势'}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            Java: JavaRoute,
            JavaScript: JSRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{ backgroundColor: '#2196F3' }}
              renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? "#F5F5F5" : color, margin: 0 }}>
                  {route.key}
                </Text>
              )}
            />
          }
        >
        </TabView>
      </View>
    )
  }
}


class TrendingTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      dataSource: [],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { tabLabel } = this.props;
    trendingService.fetchData(tabLabel)
      .then(data => {
        console.log(data);
        this.setState({
          dataSource: data
        });
      }).catch(error => {
        console.log(error);
    })
  };

  renderRow = ({item}) => {
    console.log(item);
    return <TrendingRepo data={item} />;
  }

  _keyExtractor = (item, index) => item.fullName;

  render() {
    const { dataSource } = this.state;
    console.log(dataSource);
    return (
      <View style={styles.container}>
        {
          dataSource.length ?
            <FlatList
              keyExtractor={this._keyExtractor}
              data={dataSource}
              renderItem={this.renderRow}
            /> : <Text>加载中...</Text>
        }
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
});
