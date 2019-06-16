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
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView } from 'react-navigation';
import Popular from '../pages/popular/Popular';
import Trending from '../pages/trending/Trending';
import Favorite from '../pages/favorite/Favorite';
import My from '../pages/my/My';
import { ThemeContext } from '../context/themeContext';

const icons = {
  Popular: "all-inclusive",
  Trending: "trending-up",
  Favorite: "stars",
  My: "perm-identity"
};

class Home extends PureComponent {
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
  static contextType = ThemeContext;
  render() {
    const { theme } = this.context;
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme}]}>
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
                activeColor={theme}
                inactiveColor="#85929A"
                renderIcon={({ route, focused, color }) => {
                  return (
                    <Icon
                      name={icons[route.key]}
                      color={focused ? theme : color}
                      size={25}
                    />
                  )
                }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color: focused ? theme : color, margin: 0 }}>
                    {route.title}
                  </Text>
                )}
              />
            }
          />
        </View>
      </SafeAreaView>
    )
  }
}

const HomeNav =  createBottomTabNavigator(
  {
    Popular: Popular,
    Trending: Trending,
    Favorite: Favorite,
    My: My
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = icons[routeName];

        return <Icon name={iconName} size={25} color={focused ? screenProps.theme : tintColor} />;
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        return (
          <Text style={{ color: focused ? screenProps.theme : tintColor, textAlign: 'center' }}>
            {routeName}
          </Text>
        )
      }
    }),
    tabBarOptions: {
      inactiveTintColor: 'gray',
    },
  }
);

export default HomeNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  image: {
    height: 26,
    width: 26,
  }
});
