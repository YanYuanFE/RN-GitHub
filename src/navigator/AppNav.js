import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebScreen from '../pages/web/WebView';
import Tag from '../pages/my/Tag';
import Theme from '../pages/my/Theme';
import Search from '../pages/popular/Search';
import HomeNav from './HomeNav';

const pageNav = createStackNavigator(
  {
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null
    //   })
    // },
    Web: {
      screen: WebScreen,
      navigationOptions: ({navigation}) => ({}),
    },
    Tag: {
      screen: Tag,
      navigationOptions: ({navigation}) => ({}),
    },
    Search: {
      screen: Search,
      navigationOptions: ({navigation}) => ({}),
    },
    Theme: {
      screen: Theme,
      navigationOptions: ({navigation}) => ({}),
    },
  },
  {
    initialRouteName: 'Web',
    initialRouteParams: {
      oneSceneNum: 0,
      title: '最热',
    },
  },
);

const stackRoutes = {
  Web: WebScreen,
  Tag: Tag,
  Search: Search,
  Theme: Theme,
};

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home">
        <HomeNav />
      </Stack.Screen>
      {Object.keys(stackRoutes).map((key) => (
        <Stack.Screen name={key} component={stackRoutes[key]} key={key} />
      ))}
    </Stack.Navigator>
  );
};

export default AppNav;
