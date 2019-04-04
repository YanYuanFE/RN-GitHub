import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import RepositoryService, { TYPE } from '../../services/RepositoryService';
import PopularRepo from '../../components/PopularRepo';

const popularService = new RepositoryService(TYPE.Popular);

export default class PopularTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { tabLabel } = this.props;
    popularService.fetchData(tabLabel)
      .then(result => {
        console.log(JSON.stringify(result));
        this.setState({
          dataSource: result.items
        });
      }).catch((error) => {
      console.log(error);
    })
  };

  renderRow = ({item}) => {
    return <PopularRepo data={item} />;
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