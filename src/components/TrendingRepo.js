import React, { PureComponent } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TrendingRepo extends PureComponent {
	render() {
		const { data } = this.props;
		return (
			<View style={styles.cell_container}>
				<Text style={styles.title}>{data.fullName}</Text>
				<Text style={styles.description}>{data.description}</Text>
				<View style={styles.row}>
					<View style={styles.row}>
						<Text>{data.meta}</Text>
						{
							item.contributors.map(img => (
								<Image
									style={{height:22, width: 22}}
									source={{uri: img}} />
							))
						}
					</View>
					<View style={{justifyContent:'space-between', flexDirection:'row'}}>
						<Text>Star:</Text>
						<Text>{data.stargazers_count}</Text>
					</View>
					<Icon name="grade" color="#2196F3" size={25}/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		marginBottom: 2,
		color: '#212121',
		flex: 1
	},
	description: {
		fontSize: 14,
		marginBottom: 2,
		color: '#757575'
	},
	cell_container: {
		backgroundColor: 'white',
		padding: 10,
		marginLeft: 5,
		marginRight: 5,
		marginVertical: 3,
		borderColor: '#dddddd',
		borderWidth: 0.5,
		borderRadius: 2,
		shadowColor: 'gray',
		shadowOffset: {width:0.5, height: 0.5},
		shadowOpacity: 0.4,
		shadowRadius: 1,
		elevation:2
	},
})
