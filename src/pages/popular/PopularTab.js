import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import RepositoryService, { TYPE } from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import PopularRepo from '../../components/PopularRepo';
import { checkFavorite } from '../../utils/utils';

const popularService = new RepositoryService(TYPE.Popular);
const favoriteService = new FavoriteService(TYPE.Popular);
export default class PopularTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }
    this.favoriteKeys = [];
  }
  componentDidMount() {
    this.loadData();
  }

  flushFavoriteState = () => {
    const items = this.data;
    const favoriteKeys = this.favoriteKeys;
    const dataSource = items.map(item => {
        return {
          ...item,
          isFavorite: checkFavorite(item, favoriteKeys)
        }
    });
    console.log(dataSource);
    this.setState({dataSource});
  };

  getFavoriteKeys = () => {
    favoriteService.getFavoriteKeys().then(keys => {
      if (keys) {
        this.favoriteKeys = keys;
      }
      this.flushFavoriteState();
    }).catch(err => {
      console.warn(err);
      this.flushFavoriteState();
    })
  };

  loadData = () => {
    const { tabLabel } = this.props;
    popularService.fetchData(tabLabel)
      .then(result => {
        console.log(result);
        this.data = result.items;
        this.getFavoriteKeys();
      }).catch((error) => {
      console.log(error);
    })
  };

  handleFavorite = (item, isFavorite) => {
    if (isFavorite) {
      favoriteService.saveFavoriteItem(item.id.toString(), JSON.stringify(item), this.loadData);
    } else {
      favoriteService.removeFavoriteItem(item.id.toString(), this.loadData);
    }
  }

  renderRow = ({item}) => {
    return <PopularRepo data={item} onFavorite={this.handleFavorite} />;
  }

  _keyExtractor = (item, index) => item.id + '';

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        {
          dataSource.length ?
            <FlatList
              keyExtractor={this._keyExtractor}
              data={dataSource}
              renderItem={this.renderRow}
            /> : <ActivityIndicator />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      flex:1,
      backgroundColor: 'red'
    },
    tabList: {
      height:600
    }
  });
