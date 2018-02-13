import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Button,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Popular from '../view/Popular';
import TabNavigator from 'react-native-tab-navigator';
const homeIcon = require('../assets/ic_trending_up.png');
const homeIconActive = require('../assets/ic_trending_up_active.png');

export default class HomeNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'popular',
    }
  }
  render() {
    const { selectedTab } = this.state;

    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={selectedTab === 'popular'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="最热"
            renderIcon={() => <Icon name="all-inclusive"  size={25}/>}
            renderSelectedIcon={() => <Icon name="all-inclusive" color="#2196F3" size={25}/>}
            onPress={() => this.setState({selectedTab: 'popular'})}
          >
            <Popular {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'trending'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="趋势"
            renderIcon={() => <Icon name="trending-up"  size={25}/>}
            renderSelectedIcon={() => <Icon name="trending-up" color="#2196F3" size={25}/>}
            onPress={() => this.setState({selectedTab: 'trending'})}
          >
            <Popular {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'favorite'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="收藏"
            renderIcon={() => <Icon name="stars"  size={25}/>}
            renderSelectedIcon={() => <Icon name="stars" color="#2196F3" size={25}/>}
            onPress={() => this.setState({selectedTab: 'favorite'})}
          >
            <Popular {...this.props}/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={selectedTab === 'my'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="我的"
            renderIcon={() => <Icon name="perm-identity"  size={25}/>}
            renderSelectedIcon={() => <Icon name="perm-identity" color="#2196F3" size={25}/>}
            onPress={() => this.setState({selectedTab: 'my'})}
          >
            <Popular {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 26,
    width: 26,
  }
});
