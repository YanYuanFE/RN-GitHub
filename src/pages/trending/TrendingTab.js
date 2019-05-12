import React, {PureComponent} from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator, DeviceEventEmitter
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
		this.listener = DeviceEventEmitter.addListener('FAVORITEDCHANGED_TRENDING', this.getFavoriteKeys);
	}

	componentWillUnmount(): void {
		this.listener && this.listener.remove();
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
		const { tabLabel, since } = this.props;
		this.setState({loading: true});
		trendingService.fetchData(tabLabel, since.value)
			.then(data => {
				this.data = data;
				this.getFavoriteKeys();
			}).catch(error => {
			console.log(error);
		})
	};

	handleFavorite = (item, isFavorite) => {
		const cb = () => {
			DeviceEventEmitter.emit('FAVORITECHANGED_TRENDING');
			this.fetchData();
		};
		if (isFavorite) {
			favoriteService.saveFavoriteItem(item.name, JSON.stringify(item), cb);
		} else {
			favoriteService.removeFavoriteItem(item.name, cb);
		}
	};

	renderRow = ({item}) => {
		return <TrendingRepo data={item} onFavorite={this.handleFavorite}/>;
	};

	_keyExtractor = (item, index) => item.url;

	render() {
		const { dataSource, loading } = this.state;
		return (
			<View style={styles.container}>
				{
					loading ? <ActivityIndicator size={'large'} animating={loading} style={styles.loading} /> :
						<FlatList
							refreshing={loading}
							onRefresh={this.fetchData}
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
