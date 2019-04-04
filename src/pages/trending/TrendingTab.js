import React, {PureComponent} from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator
} from 'react-native';
import RepositoryService, {TYPE} from '../../services/RepositoryService';
import TrendingRepo from '../../components/TrendingRepo';
import FavoriteService from '../../services/FavoriteService';
import { checkFavorite } from '../../utils/utils';

const favoriteService = new FavoriteService(TYPE.Popular);

const trendingService = new RepositoryService(TYPE.Trending);
export default class TrendingTab extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		}
		this.favoriteKeys = [];
	}

	componentDidMount() {
		this.fetchData();
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

	fetchData = () => {
		const {tabLabel} = this.props;
		trendingService.fetchData(tabLabel)
			.then(data => {
				//   console.log(data);
				this.data = data;
				this.getFavoriteKeys();
			}).catch(error => {
			console.log(error);
		})
	};

	handleFavorite = (item, isFavorite) => {
		if (isFavorite) {
			favoriteService.saveFavoriteItem(item.fullName, JSON.stringify(item), this.fetchData);
		} else {
			favoriteService.removeFavoriteItem(item.fullName, this.fetchData);
		}
	}

	renderRow = ({item}) => {
		return <TrendingRepo data={item} onFavorite={this.handleFavorite}/>;
	}

	_keyExtractor = (item, index) => item.fullName;

	render() {
		const {dataSource} = this.state;
		console.log(dataSource);
		return (
			<View style={styles.container}>
				{
					dataSource && dataSource.length ?
						<FlatList
							keyExtractor={this._keyExtractor}
							data={dataSource}
							renderItem={this.renderRow}
						/> : <ActivityIndicator/>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tabContainer: {
		flex: 1,
		backgroundColor: 'red'
	},
	tabList: {
		height: 600
	}
});
