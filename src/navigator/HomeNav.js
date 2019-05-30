import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Image,
  Button,
  Text,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Popular from '../pages/popular/Popular';
import Trending from '../pages/trending/Trending';
import Favorite from '../pages/favorite/Favorite';
import My from '../pages/my/My';

export default class HomeNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'Popular', title: 'Popular' },
        { key: 'Trending', title: 'Trending' },
        { key: 'Favorite', title: 'Favorite' },
        { key: 'My', title: 'My' },
      ],
    }
  }
  render() {
    const icons = {
      Popular: "all-inclusive",
      Trending: "trending-up",
      Favorite: "stars",
      My: "perm-identity"
    };
    return (
      <View style={styles.container}>
        <TabView
          tabBarPosition="bottom"
          navigationState={this.state}
          renderScene={SceneMap({
            Popular: Popular,
            Trending: Trending,
            Favorite: Favorite,
            My: My
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#FFF' }}
              style={{
                backgroundColor: '#FFF',
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.4,
                shadowRadius: 5
              }}
              activeColor="#2196F3"
              inactiveColor="#85929A"
              renderIcon={({ route, focused, color }) => {
                return (
                  <Icon
                    name={icons[route.key]}
                    color={focused ? "#2196F3" : color}
                    size={25}
                  />
                )
              }}
              renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? "#2196F3" : color, margin: 0 }}>
                  {route.title}
                </Text>
              )}
            />
          }
        />
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
