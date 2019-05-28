import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 25;

export default class ThemeCard extends PureComponent {
    render() {
        const { data } = this.props;
        const item = data.data;
        return (
            <View style={styles.wrapper}>
                <View>
                    <Text style={styles.themeTitle}>{data.title}</Text>
                </View>
                {
                    Object.keys(item).map(key => {
                        return (
                            <View style={styles.themeItem} key={key}>
                                <TouchableHighlight
                                    key={key}
                                    style={[{backgroundColor: item[key]}, styles.themeBtn]}
                                    underlayColor='white'
                                    onPress={()=>this.onSelectTheme(key)}
                                >
                                    <View></View>
                                </TouchableHighlight>
                                <View>
                                    <Text style={styles.themeText}>{key}</Text>
                                    <Text style={styles.themeText}>{item[key]}</Text>
                                </View>
                            </View>
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
        backgroundColor: 'white',
        // borderRadius: 3,
        // shadowColor: 'gray',
        // shadowOffset: {width: 2, height: 2},
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        // padding: 3
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        flex: 1,
    },
    themeItem: {
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: cellWH,
        height: cellWH,
        marginLeft: vMargin,
        marginTop: hMargin,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    themeBtn: {
        width: 50,
        height: 50
    },
    themeText: {
        color: '#2d3748',
        fontWeight: '500',
        fontSize: 16,
    },
    themeTitle: {
        color: '#1a202c',
        fontWeight: '500',
        fontSize: 25,
    }
})