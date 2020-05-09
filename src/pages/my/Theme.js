import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import ThemeCard from '../../components/ThemeCard';
import {Palette} from '../../api/themes';
import ThemeService from '../../services/ThemeService';

const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 25;
const themeService = new ThemeService();

const Theme = () => {
  const navigationOptions = ({navigation, screenProps}) => {
    return {
      title: '主题设置',
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('save')}>
          <Text style={{color: '#FFF', marginRight: 10}}>保存</Text>
        </TouchableOpacity>
      ),
    };
  };

  const handleSelect = (key) => {
    console.log(key);
    const {navigation} = this.props;
    const cb = () => {
      DeviceEventEmitter.emit('THEME_CHANGED');
      navigation.goBack();
    };
    themeService.saveTheme(key, cb);
  };

  const renderRow = ({item}) => {
    return <ThemeCard data={item} onSelect={handleSelect} />;
  };

  const _keyExtractor = (item, index) => item.title;

  const dataSource = Object.keys(Palette).map((key) => {
    return {
      title: key,
      data: Palette[key],
    };
  });
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={_keyExtractor}
        data={dataSource}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Theme;

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
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
