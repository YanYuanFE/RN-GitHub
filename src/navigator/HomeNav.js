import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Popular from '../pages/popular/Popular';
import Trending from '../pages/trending/Trending';
import Favorite from '../pages/favorite/Favorite';
import My from '../pages/my/My';
import {useTheme} from '@react-navigation/native';

const icons = {
  Popular: 'all-inclusive',
  Trending: 'trending-up',
  Favorite: 'stars',
  My: 'perm-identity',
};

const Tab = createBottomTabNavigator();

const tabRoutes = {
  Popular: Popular,
  Trending: Trending,
  Favorite: Favorite,
  My: My,
};

const HomeNav = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconName = icons[route.name];

          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Trending" component={Trending} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="My" component={My} />
    </Tab.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    height: 26,
    width: 26,
  },
});
