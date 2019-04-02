import React, { Component } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Dimensions
} from 'react-native';
import { fetchPopularRepo } from '../api/popular';
import RepoCell from '../components/RepoCell';
import NavigationBar from '../components/NavigationBar';

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
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

  renderRow = (data) => {
    return <RepoCell data={data} />
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={(data) => this.renderRow(data)}
        >
        </ListView>
      </View>
    )
  }
}

const JavaRoute = () => <PopularTab tabLabel="Java">Java</PopularTab>;
const JSRoute = () => <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>;

export default class Popular extends Component {
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
          style={{backgroundColor: "#2196F3"}}
          title={'最热'}
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
            />
          }
        >
        </TabView>
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
