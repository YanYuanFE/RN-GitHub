import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator
} from 'react-native';
import { TYPE } from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import PopularRepo from '../../components/PopularRepo';
import TrendingRepo from '../../components/TrendingRepo';

export default class FavoriteTab extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false
		};
		this.favoriteService = new FavoriteService(props.type);
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		this.setState({loading: true});
		this.favoriteService.getAllItems()
			.then(result => {
				console.log(result);
				const dataSource = result.map(item => {
					return {
						...item,
						isFavorite: true
					}
				});
				this.setState({
					dataSource,
					loading: false
				});
			}).catch((error) => {
				console.log(error);
				this.setState({loading: false});
			})
	};

	handleFavorite = (item, isFavorite) => {
		const key = item.id ? item.id.toString() : item.name;
		if (isFavorite) {
			this.favoriteService.saveFavoriteItem(key, JSON.stringify(item), this.loadData);
		} else {
			this.favoriteService.removeFavoriteItem(key, this.loadData);
		}
	}

	renderRow = ({item}) => {
		const { type } = this.props;
		return type === TYPE.Popular ?
			<PopularRepo data={item} onFavorite={this.handleFavorite} /> :
			<TrendingRepo data={item} onFavorite={this.handleFavorite} />;
	}

	_keyExtractor = (item, index) => item.id ? item.id + '' : item.name;

	render() {
		const { dataSource, loading } = this.state;
		return (
			<View style={styles.container}>
				{
					loading ?
					<ActivityIndicator /> :
					<FlatList
						style={styles.list}
						keyExtractor={this._keyExtractor}
						data={dataSource}
						renderItem={this.renderRow}
					/>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	list: {
		flex:1,
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
