import React, {PureComponent, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import RepositoryService, {TYPE} from '../../services/RepositoryService';
import TrendingRepo from '../../components/TrendingRepo';
import FavoriteService from '../../services/FavoriteService';
import {checkFavorite} from '../../utils/utils';
import {ThemeContext, useTheme} from '../../context/themeContext';

const favoriteService = new FavoriteService(TYPE.Trending);
const trendingService = new RepositoryService(TYPE.Trending);

const TrendingTab = ({tabLabel, since}) => {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let favoriteKeys = [];
  let data = [];
  const theme = useTheme();

  useEffect(() => {
    fetchData();
    const listener = DeviceEventEmitter.addListener(
      'FAVORITEDCHANGED_TRENDING',
      getFavoriteKeys,
    );
    return () => {
      listener && listener.remove();
    };
  }, []);

  const flushFavoriteState = () => {
    const items = data;
    const favoriteKeys = favoriteKeys;
    const dataSource = items.map((item) => {
      return {
        ...item,
        isFavorite: checkFavorite(item, favoriteKeys),
      };
    });
    setData(dataSource);
    setLoading(false);
  };

  const getFavoriteKeys = () => {
    favoriteService
      .getFavoriteKeys()
      .then((keys) => {
        if (keys) {
          favoriteKeys = keys;
        }
        flushFavoriteState();
      })
      .catch((err) => {
        console.warn(err);
        flushFavoriteState();
      });
  };

  const fetchData = () => {
    setLoading(true);
    trendingService
      .fetchData(tabLabel, since.value)
      .then((data) => {
        data = data;
        getFavoriteKeys();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFavorite = (item, isFavorite) => {
    const cb = () => {
      DeviceEventEmitter.emit('FAVORITECHANGED_TRENDING');
      fetchData();
    };
    if (isFavorite) {
      favoriteService.saveFavoriteItem(item.name, JSON.stringify(item), cb);
    } else {
      favoriteService.removeFavoriteItem(item.name, cb);
    }
  };

  const renderRow = ({item}) => {
    return (
      <TrendingRepo data={item} onFavorite={handleFavorite} theme={theme} />
    );
  };

  const _keyExtractor = (item, index) => item.url;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          animating={loading}
          style={styles.loading}
        />
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={this.fetchData}
          keyExtractor={this._keyExtractor}
          data={dataSource}
          renderItem={this.renderRow}
        />
      )}
    </View>
  );
};

export default TrendingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
