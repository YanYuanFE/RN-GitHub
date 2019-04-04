import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import RepositoryService, { TYPE } from '../../services/RepositoryService';
import TrendingRepo from '../../components/TrendingRepo';

const trendingService = new RepositoryService(TYPE.Trending);
export default class TrendingTab extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
      }
    }
  
    componentDidMount() {
      this.fetchData();
    }
  
    fetchData = () => {
      const { tabLabel } = this.props;
      trendingService.fetchData(tabLabel)
        .then(data => {
        //   console.log(data);
          this.setState({
            dataSource: data
          });
        }).catch(error => {
          console.log(error);
      })
    };
  
    renderRow = ({item}) => {
      return <TrendingRepo data={item} />;
    }
  
    _keyExtractor = (item, index) => item.fullName;
  
    render() {
      const { dataSource } = this.state;
      console.log(dataSource);
      return (
        <View style={styles.container}>
          {
              dataSource && dataSource.length ?
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
      alignItems: 'center'
    },
    tabContainer: {
      flex:1,
      backgroundColor: 'red'
    },
    tabList: {
      height:600
    }
  });