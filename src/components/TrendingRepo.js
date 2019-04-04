import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image, TouchableHighlight, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from "../services/NavigationService";

export default class TrendingRepo extends PureComponent {
	goDetail = () => {
		const { data } = this.props;
		NavigationService.navigate('Web', {
			url: `https://github.com${data.url}`,
			title: data.fullName
		});
	};

	handleFavorite = () => {
		const { data, onFavorite } = this.props;
		onFavorite(data, !data.isFavorite);
	};

	render() {
		const { data } = this.props;
		if (!data) {
			return null;
		}
		return (
			<View style={styles.cell_container}>
				<Text style={styles.title}>{data.fullName}</Text>
				<TouchableHighlight onPress={this.goDetail}>
					<Text style={styles.description}>{data.description}</Text>
				</TouchableHighlight>
				<View style={styles.row}>
					<Text style={styles.description}>{data.meta}</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.row}>
						<Text style={styles.author}>Built by  </Text>
						{
							data.contributors.map(img => (
								<Image
									key={img}
									style={styles.avatar}
									source={{uri: img}}
								/>
							))
						}
					</View>
					<TouchableOpacity onPress={this.handleFavorite}>
						<Icon name="grade" color={data.isFavorite ? "#2196F3" : "#E5E5E5"} size={25}/>
					</TouchableOpacity>
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
	author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
	avatar: {
		height: 22,
		width: 22,
		borderRadius: 11
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
});
