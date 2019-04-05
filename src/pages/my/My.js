import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { TYPE } from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import PopularRepo from '../../components/PopularRepo';
import TrendingRepo from '../../components/TrendingRepo';

export default class My extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<NavigationBar
					style={{backgroundColor: "#2196F3"}}
					title={'我的'}
					statusBar={{backgroundColor: '#2196F3'}}
				/>
				<Text>My</Text>
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
	tabContainer: {
		flex:1,
		backgroundColor: 'red'
	},
	tabList: {
		height:600
	}
});

