import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
	},
	CUSTOM_LANGUAGE: {
		title: '自定义语言',
		component: 'Tag',
		flag: TYPE_LANGUAGE.FLAG_LANGUAGE
	}
};

export default class My extends PureComponent {
	handleClick = (target) => {
		console.log(this.props);
		NavigationService.navigate(target.component, {
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
					<TouchableOpacity>
						<View style={[styles.item, {height: 90}]}>
							<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
								<Icon name={'logo-github'} color={'#2196F3'} size={40} />
								<Text>RN-GitHub</Text>
							</View>
						</View>
					</TouchableOpacity>
					<Text style={styles.groupTitle}>最热管理</Text>
					<TouchableOpacity onPress={() => this.handleClick(MENU.CUSTOM_TAG)}>
						<View style={styles.group}>
							<Text style={styles.title}>自定义标签</Text>
							<Icon name={'ios-arrow-forward'} color={'#2196F3'} size={25} />
						</View>
					</TouchableOpacity>
					<Text style={styles.groupTitle}>趋势管理</Text>
					<TouchableOpacity onPress={() => this.handleClick(MENU.CUSTOM_LANGUAGE)}>
						<View style={styles.group}>
							<Text style={styles.title}>自定义语言</Text>
							<Icon name={'ios-arrow-forward'} color={'#2196F3'} size={25} />
						</View>
					</TouchableOpacity>
					<Text style={styles.groupTitle}>设置</Text>
					<TouchableOpacity onPress={() => {}}>
						<View style={styles.group}>
							<Text style={styles.title}>主题设置</Text>
							<Icon name={'ios-arrow-forward'} color={'#2196F3'} size={25} />
						</View>
					</TouchableOpacity>
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
		borderStyle: 'solid',
	},
	group: {
		alignItems: 'center',
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8',
		borderStyle: 'solid',
	},
	groupTitle: {
		marginLeft: 10,
		marginTop: 10,
		marginBottom: 5,
		fontSize: 14,
		color: 'gray'
	},
	title: {
		flex:1,
	},
	item: {
		backgroundColor: 'white',
		padding: 10, height: 60,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
});

