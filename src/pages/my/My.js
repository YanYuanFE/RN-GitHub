import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { TYPE } from '../../services/RepositoryService';
import FavoriteService from '../../services/FavoriteService';
import Tag from './Tag';
import NavigationService from "../../services/NavigationService";

const MENU = {
	CUSTOM_TAG: {
		title: '自定义标签',
		component: 'Tag',
	}
};

export default class My extends PureComponent {
	handleClick = (type) => {
		const target = MENU.CUSTOM_TAG;
		console.log(this.props);
		NavigationService.navigate('Tag', {
			data: target,
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<NavigationBar
					style={{backgroundColor: "#2196F3"}}
					title={'我的'}
					statusBar={{backgroundColor: '#2196F3'}}
				/>
				<ScrollView>
					<TouchableHighlight onPress={() => this.handleClick(MENU.CUSTOM_TAG)}>
						<View>
							<Text>标签管理</Text>
						</View>
					</TouchableHighlight>
				</ScrollView>
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

