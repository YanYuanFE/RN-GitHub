import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebScreen from '../pages/web/WebView';
import Tag from '../pages/my/Tag';
import Theme from '../pages/my/Theme';
import Search from '../pages/popular/Search';
import HomeNav from './HomeNav';
import {useTheme} from '@react-navigation/native';

const stackRoutes = {
  Web: WebScreen,
  Tag: Tag,
  Search: Search,
  Theme: Theme,
};

const Stack = createStackNavigator();

const AppNav = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {HomeNav}
      </Stack.Screen>
      {Object.keys(stackRoutes).map((key) => (
        <Stack.Screen
          name={key}
          component={stackRoutes[key]}
          key={key}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppNav;
