import React, {PureComponent} from 'react';
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
import {ThemeContext} from '../../context/themeContext';

export default class FavoriteTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
    };
    this.favoriteService = new FavoriteService(props.type);
  }

  static contextType = ThemeContext;

  componentDidMount() {
    const {type} = this.props;
    this.loadData();
    this.listener = DeviceEventEmitter.addListener(
      `FAVORITECHANGED_${type}`,
      this.loadData,
    );
  }

  componentWillUnmount(): void {
    this.listener && this.listener.remove();
  }

  loadData = () => {
    this.setState({loading: true});
    this.favoriteService
      .getAllItems()
      .then((result) => {
        const dataSource = result.map((item) => {
          return {
            ...item,
            isFavorite: true,
          };
        });
        this.setState({
          dataSource,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  handleFavorite = (item, isFavorite) => {
    const {type} = this.props;
    const key = item.id ? item.id.toString() : item.name;
    const CHANGE_FLAG =
      type === TYPE.Popular
        ? 'FAVORITECHANGED_POPULAR'
        : 'FAVORITEDCHANGED_TRENDING';
    const cb = () => {
      DeviceEventEmitter.emit(CHANGE_FLAG);
      this.loadData();
    };
    if (isFavorite) {
      this.favoriteService.saveFavoriteItem(key, JSON.stringify(item), cb);
    } else {
      this.favoriteService.removeFavoriteItem(key, cb);
    }
  };

  renderRow = ({item}) => {
    const {type} = this.props;
    const {theme} = this.context;
    console.log(theme);
    return type === TYPE.Popular ? (
      <PopularRepo data={item} onFavorite={this.handleFavorite} theme={theme} />
    ) : (
      <TrendingRepo
        data={item}
        onFavorite={this.handleFavorite}
        theme={theme}
      />
    );
  };

  _keyExtractor = (item, index) => (item.id ? item.id + '' : item.name);

  render() {
    const {dataSource, loading} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          refreshing={loading}
          onRefresh={this.loadData}
          keyExtractor={this._keyExtractor}
          data={dataSource}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}

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
