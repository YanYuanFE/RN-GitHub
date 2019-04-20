import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { TYPE_LANGUAGE } from '../../services/LanguageService';
import FavoriteService from '../../services/FavoriteService';
import Tag from './Tag';
import NavigationService from "../../services/NavigationService";

const MENU = {
	CUSTOM_TAG: {
		title: '自定义标签',
		component: 'Tag',
		flag: TYPE_LANGUAGE.FLAG_KEY
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
						<View style={styles.line}>
							<Text style={styles.title}>标签管理</Text>
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
	line: {
		flex:1,
		borderBottomWidth: 1,
		borderBottomColor: '#2196F3',
		borderStyle: 'solid'
	},
	title: {
		marginLeft: 10,
		marginTop: 10,
		marginBottom: 5,
		fontSize: 14,
		color: 'gray'
	}
});

