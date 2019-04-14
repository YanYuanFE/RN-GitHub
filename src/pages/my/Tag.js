import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight
} from 'react-native';

export default class Tag extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('data').title,
			headerStyle: {
				backgroundColor: '#2196F3',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};
	render () {
		return (
			<View>

			</View>
		)
	}
}
