import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RepositoryService, {TYPE} from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import {checkFavorite} from '../../utils/utils';
import PopularRepo from '../../components/PopularRepo';
import {useTheme} from '../../context/themeContext';

const searchService = new RepositoryService();
const favoriteService = new FavoriteService(TYPE.Popular);

const Search = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '搜索',
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, theme]);

  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const theme = useTheme();
  let favoriteKeys = [];
  let data = [];

  const flushFavoriteState = () => {
    const items = data;
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

  const handleSearch = () => {
    setLoading(true);
    searchService
      .searchData(value)
      .then((res) => {
        data = res.items;
        getFavoriteKeys();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderRow = ({item}) => {
    return (
      <PopularRepo data={item} onFavorite={handleFavorite} theme={theme} />
    );
  };

  const handleFavorite = (item, isFavorite) => {
    if (isFavorite) {
      favoriteService.saveFavoriteItem(
        item.id.toString(),
        JSON.stringify(item),
        handleSearch,
      );
    } else {
      favoriteService.removeFavoriteItem(item.id.toString(), handleSearch);
    }
  };

  const _keyExtractor = (item, index) => item.id + '';

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={[styles.input, {borderColor: theme.primary}]}
          autoFoucs
          value={value}
          onChangeText={(value) => setValue(value)}
        />
        <TouchableOpacity
          style={[styles.title, {backgroundColor: theme.primary}]}
          onPress={handleSearch}>
          <Text style={styles.text}>搜索</Text>
        </TouchableOpacity>
      </View>
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
            onRefresh={handleSearch}
            keyExtractor={_keyExtractor}
            data={dataSource}
            renderItem={renderRow}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    flex: 1,
    marginLeft: 10,
    borderRadius: 2,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 2,
  },
  text: {
    fontSize: 14,
    color: '#FFF',
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginRight: 10,
  },
});
