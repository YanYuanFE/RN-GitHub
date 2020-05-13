import React from 'react';
import {StyleSheet, View} from 'react-native';
import FavoriteTab from './FavoriteTab';
import NavigationBar from '../../components/NavigationBar';
import {TYPE} from '../../services/RepositoryService';
import {useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Favorite = () => {
  const {colors} = useTheme();

  const PopularRoute = () => (
    <FavoriteTab tabLabel="Popular" type={TYPE.Popular} />
  );
  const TrendingRoute = () => (
    <FavoriteTab tabLabel="Trending" type={TYPE.Trending} />
  );

  return (
    <View style={styles.container}>
      <NavigationBar
        style={{backgroundColor: colors.primary}}
        title={'喜欢'}
        statusBar={{backgroundColor: colors.primary}}
      />
      <Tab.Navigator>
        <Tab.Screen name={'Popular'} component={PopularRoute} />
        <Tab.Screen name={'Trending'} component={TrendingRoute} />
      </Tab.Navigator>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  tabList: {
    height: 600,
  },
});
