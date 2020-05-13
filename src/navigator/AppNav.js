import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebScreen from '../pages/web/WebView';
import Tag from '../pages/my/Tag';
import Theme from '../pages/my/Theme';
import Search from '../pages/popular/Search';
import HomeNav from './HomeNav';

const stackRoutes = {
  Web: WebScreen,
  Tag: Tag,
  Search: Search,
  Theme: Theme,
};

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        // headerMode='none'
        options={{
          headerShown: false,
          title: '首页'
        }}
      >
        {HomeNav}
      </Stack.Screen>
      {Object.keys(stackRoutes).map((key) => (
        <Stack.Screen name={key} component={stackRoutes[key]} key={key} />
      ))}
    </Stack.Navigator>
  );
};

export default AppNav;
