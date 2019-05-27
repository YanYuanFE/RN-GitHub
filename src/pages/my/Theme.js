import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Platform
} from 'react-native';
import { ThemeColors } from '../../api/themes';

export default class Tag extends PureComponent {
    static navigationOptions = ({ navigation }) => {
		return {
			title: "主题设置",
			headerStyle: {
				backgroundColor: '#2196F3',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerRight: (
				<TouchableOpacity onPress={navigation.getParam('save')}>
					<Text style={{color: '#FFF'}}>保存</Text>
				</TouchableOpacity>
			)
		};
	};
    render() {
        return(
            <View style={styles.container}>
                {
                    Object.keys(ThemeColors).map(key => {
                        return (
                            <TouchableHighlight
                                key={key}
                                style={{flex: 1}}
                                underlayColor='white'
                                onPress={()=>this.onSelectTheme(key)}
                            >
                                <View style={[{backgroundColor: ThemeColors[key]}, styles.themeItem]}>
                                    <Text style={styles.themeText}>{key}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    }
})