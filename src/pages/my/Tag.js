import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	Platform
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';
import { updateArray } from '../../utils/utils';

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

	state = {
		dataList: []
	};

	changeDatas = [];

	componentDidMount() {
		const { navigation } = this.props;
		this.languageService = new LanguageService(navigation.getParam('data').flag);
		this.loadData();
	}

	loadData = () => {
		this.languageService.fetchData().then(data => {
			this.setState({
				dataList: data
			})
		}).catch(error => {
			console.error(error);
		})
	};

	handleChange = (data) => {
		data.checked = !data.checked;
		updateArray(this.changeDatas, data);
		console.log(this.changeDatas);
	}

	render () {
		const { dataList } = this.state;
		const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';
		return (
			<View style={styles.container}>
				<ScrollView>
					{
						dataList.map((item, index) => {
							return(
								<CheckBox
									isChecked={item.checked}
									key={item.name}
									style={{flex:1, padding: 10}}
									onClick={() => this.handleChange(item)}
									leftText={item.name}
									checkedImage={<Icon name={`${iconType}-checkbox`} color={'#2196F3'} size={25} />}
									unCheckedImage={<Icon name={`${iconType}-checkbox-outline`} color={'#2196F3'} size={25} />}
								/>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f2f2'
	},
	item: {
		flexDirection: 'row',
	},
	line: {
		flex: 1,
		height: 0.3,
		backgroundColor: 'darkgray',
	},
})
