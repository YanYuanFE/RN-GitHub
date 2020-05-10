import React, {useState, useEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteTab from './FavoriteTab';
import NavigationBar from '../../components/NavigationBar';
import {TYPE} from '../../services/RepositoryService';
import {ThemeContext, useTheme} from '../../context/themeContext';

const Favorite = () => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'Popular', title: '最热'},
    {key: 'Trending', title: '趋势'},
  ]);
  const theme = useTheme();

  const PopularRoute = () => (
    <FavoriteTab tabLabel="Popular" type={TYPE.Popular} />
  );
  const TrendingRoute = () => (
    <FavoriteTab tabLabel="Trending" type={TYPE.Trending} />
  );
  return (
    <View style={styles.container}>
      <NavigationBar
        style={{backgroundColor: theme.primary}}
        title={'喜欢'}
        statusBar={{backgroundColor: theme.primary}}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          Popular: PopularRoute,
          Trending: TrendingRoute,
        })}
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            style={{backgroundColor: theme.primary}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color: focused ? '#F5F5F5' : color, margin: 0}}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
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
