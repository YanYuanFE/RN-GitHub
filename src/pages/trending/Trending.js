import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

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
          style={{backgroundColor: "#2196F3"}}
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
