import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {TYPE} from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import PopularRepo from '../../components/PopularRepo';
import TrendingRepo from '../../components/TrendingRepo';
import {useTheme} from '@react-navigation/native';

const FavoriteTab = ({type}) => {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let favoriteKeys = [];
  let data = [];
  const {colors} = useTheme();
  const favoriteService = new FavoriteService(type);

  useEffect(() => {
    loadData();
    const listener = DeviceEventEmitter.addListener(
      `FAVORITECHANGED_${type}`,
      loadData,
    );
    return () => {
      listener && listener.remove();
    };
  }, []);

  const loadData = () => {
    setLoading(true);
    favoriteService
      .getAllItems()
      .then((result) => {
        const dataSource = result.map((item) => {
          return {
            ...item,
            isFavorite: true,
          };
        });
        setData(dataSource);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleFavorite = (item, isFavorite) => {
    const key = item.id ? item.id.toString() : item.name;
    const CHANGE_FLAG =
      type === TYPE.Popular
        ? 'FAVORITECHANGED_POPULAR'
        : 'FAVORITEDCHANGED_TRENDING';
    const cb = () => {
      DeviceEventEmitter.emit(CHANGE_FLAG);
      loadData();
    };
    if (isFavorite) {
      favoriteService.saveFavoriteItem(key, JSON.stringify(item), cb);
    } else {
      favoriteService.removeFavoriteItem(key, cb);
    }
  };

  const renderRow = ({item}) => {
    return type === TYPE.Popular ? (
      <PopularRepo data={item} onFavorite={handleFavorite} colors={colors} />
    ) : (
      <TrendingRepo data={item} onFavorite={handleFavorite} colors={colors} />
    );
  };

  const _keyExtractor = (item, index) => (item.id ? item.id + '' : item.name);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        refreshing={loading}
        onRefresh={loadData}
        keyExtractor={_keyExtractor}
        data={dataSource}
        renderItem={renderRow}
      />
    </View>
  );
};

export default FavoriteTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list: {
    flex: 1,
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
