import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, DeviceEventEmitter} from 'react-native';
import RepositoryService, {TYPE} from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import PopularRepo from '../../components/PopularRepo';
import {checkFavorite} from '../../utils/utils';
import {useTheme} from '../../context/themeContext';

const popularService = new RepositoryService(TYPE.Popular);
const favoriteService = new FavoriteService(TYPE.Popular);

const PopularTab = ({tabLabel}) => {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let favoriteKeys = [];
  let data = [];
  const theme = useTheme();

  useEffect(() => {
    loadData();
    const listener = DeviceEventEmitter.addListener(
      'FAVORITECHANGED_POPULAR',
      getFavoriteKeys,
    );
    return () => {
      listener && listener.remove();
    };
  }, []);

  const flushFavoriteState = () => {
    console.log(data);
    const dataSource = data.map((item) => {
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

  const loadData = () => {
    setLoading(true);
    popularService
      .fetchData(tabLabel)
      .then((result) => {
        data = result.items;
        getFavoriteKeys();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFavorite = (item, isFavorite) => {
    const cb = () => {
      DeviceEventEmitter.emit('FAVORITECHANGED_POPULAR');
      loadData();
    };
    if (isFavorite) {
      favoriteService.saveFavoriteItem(
        item.id.toString(),
        JSON.stringify(item),
        cb,
      );
    } else {
      favoriteService.removeFavoriteItem(item.id.toString(), cb);
    }
  };

  const renderRow = ({item}) => {
    return (
      <PopularRepo data={item} onFavorite={handleFavorite} theme={theme} />
    );
  };

  const _keyExtractor = (item, index) => item.id + '';

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={loadData}
        keyExtractor={_keyExtractor}
        data={dataSource}
        renderItem={renderRow}
      />
    </View>
  );
};

export default PopularTab;

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
