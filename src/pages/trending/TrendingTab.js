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

const favoriteService = new FavoriteService(TYPE.Trending);

const trendingService = new RepositoryService(TYPE.Trending);
export default class TrendingTab extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false
		};
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
		this.setState({
			dataSource,
			loading: false
		});
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
		this.setState({loading: true});
		trendingService.fetchData(tabLabel)
			.then(data => {
				console.log(data);
				this.data = data;
				this.getFavoriteKeys();
			}).catch(error => {
			console.log(error);
		})
	};

	handleFavorite = (item, isFavorite) => {
		if (isFavorite) {
			favoriteService.saveFavoriteItem(item.name, JSON.stringify(item), this.fetchData);
		} else {
			favoriteService.removeFavoriteItem(item.name, this.fetchData);
		}
	};

	renderRow = ({item}) => {
		return <TrendingRepo data={item} onFavorite={this.handleFavorite}/>;
	};

	_keyExtractor = (item, index) => item.name;

	render() {
		const { dataSource, loading } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					refreshing={loading}
					onRefresh={this.fetchData}
					keyExtractor={this._keyExtractor}
					data={dataSource}
					renderItem={this.renderRow}
				/>
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
