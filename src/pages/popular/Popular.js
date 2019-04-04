import React, { PureComponent } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions
} from 'react-native';
import PopularTab from './PopularTab';
import NavigationBar from '../../components/NavigationBar';

const JavaRoute = () => <PopularTab tabLabel="Java">Java</PopularTab>;
const JSRoute = () => <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>;

export default class Popular extends PureComponent {
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
