import React, { PureComponent } from 'react';
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
import RepositoryService, {TYPE} from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import { checkFavorite } from '../../utils/utils';
import PopularRepo from '../../components/PopularRepo';

const searchService = new RepositoryService();
const favoriteService = new FavoriteService(TYPE.Popular);

export default class Search extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: '搜索',
			headerStyle: {
				backgroundColor: '#2196F3',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};
	state = {
		value: '',
		dataSource: [],
		loading: false
	};
	favoriteKeys = [];
	data = [];

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

	handleSearch = () => {
		const { value } = this.state;
		this.setState({loading: true});
		searchService.searchData(value).then(res => {
			this.data = res.items;
			this.getFavoriteKeys();
		}).catch((error) => {
			console.log(error);
		})
	};

	renderRow = ({item}) => {
		return <PopularRepo data={item} onFavorite={this.handleFavorite} />;
	};

	handleFavorite = (item, isFavorite) => {
		if (isFavorite) {
			favoriteService.saveFavoriteItem(item.id.toString(), JSON.stringify(item), this.handleSearch);
		} else {
			favoriteService.removeFavoriteItem(item.id.toString(), this.loadData);
		}
	};

	_keyExtractor = (item, index) => item.id + '';

	render() {
		const { value, loading, dataSource } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.search}>
					<TextInput style={styles.input} autoFoucs value={value} onChangeText={(value) => this.setState({value})}/>
					<TouchableOpacity style={styles.title} onPress={this.handleSearch}>
						<Text style={styles.text}>搜索</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					{
						loading ? <ActivityIndicator size={'large'} animating={loading} style={styles.loading} /> :
							<FlatList
								refreshing={loading}
								onRefresh={this.handleSearch}
								keyExtractor={this._keyExtractor}
								data={dataSource}
								renderItem={this.renderRow}
							/>
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		height: 40,
		borderColor: '#2196F3',
		borderWidth: 1,
		flex: 1,
		marginLeft: 10,
		borderRadius: 2,
	},
	title: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2196F3',
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
		height: 45,
		marginRight: 10
	}
});

