import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 110;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;

const ThemeCard = ({data, onSelect}) => {
  const item = data.data;
  
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.themeTitle}>{data.title}</Text>
      </View>
      <View style={styles.wrapper}>
        {Object.keys(item).map((key) => {
          return (
            <View style={styles.themeItem} key={key}>
              <TouchableHighlight
                key={key}
                style={[{backgroundColor: item[key]}, styles.themeBtn]}
                underlayColor="white"
                onPress={() => onSelect(item[key])}>
                <View />
              </TouchableHighlight>
              <View>
                <Text style={styles.themeText}>{key}</Text>
                <Text style={styles.themeSubText}>{item[key]}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ThemeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
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
  titleRow: {
    paddingLeft: 20,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: cellWH,
    height: cellWH - 20,
    marginLeft: vMargin,
    marginTop: hMargin,
  },
  themeBtn: {
    width: 50,
    height: 50,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  themeText: {
    color: '#2d3748',
    fontSize: 14,
  },
  themeSubText: {
    color: '#2d3748',
    fontSize: 12,
  },
  themeTitle: {
    color: '#1a202c',
    fontWeight: '500',
    fontSize: 20,
  },
});
