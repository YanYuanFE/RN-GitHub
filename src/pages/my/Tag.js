import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageService, {TYPE_LANGUAGE} from '../../services/LanguageService';
import {useTheme} from '../../context/themeContext';

const screenW = Dimensions.get('window').width;

const Tag = () => {
  const navigationOptions = ({navigation, screenProps}) => {
    return {
      title: navigation.getParam('data').title,
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
  const [dataList, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const theme = useTheme();
  let languageService;

  const changeDatas = [];

  useEffect(() => {
    const {navigation} = this.props;
    navigation.setParams({save: handleSave});
    languageService = new LanguageService(navigation.getParam('data').flag);
    loadData();
  }, []);

  const loadData = () => {
    languageService
      .fetchData()
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (data) => {
    const changeList = dataList.map((item) => {
      return item.name === data.name
        ? {
            ...data,
            checked: !data.checked,
          }
        : item;
    });
    console.log(changeList);
    setData(dataList);
    // data.checked = !data.checked;
    // updateArray(this.changeDatas, data);
    console.log(this.changeDatas);
  };

  const handleSave = () => {
    const {navigation} = this.props;
    // if (this.changeDatas.length === 0) {
    // 	this.props.navigation.goBack();
    // 	return;
    // }
    // this.changeDatas.forEach((item => {
    // 	remove()
    // }))
    const cb = () => {
      DeviceEventEmitter.emit('THEME_CHANGED');
      navigation.goBack();
    };

    languageService.saveData(dataList, cb);
  };

  const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {dataList.map((item, index) => {
          return (
            <CheckBox
              isChecked={item.checked}
              key={item.name}
              style={styles.checkbox}
              onClick={() => handleChange(item)}
              leftText={item.name}
              checkedImage={
                <Icon name={`${iconType}-checkbox`} color={theme} size={25} />
              }
              unCheckedImage={
                <Icon
                  name={`${iconType}-checkbox-outline`}
                  color={theme}
                  size={25}
                />
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  checkbox: {
    width: screenW / 2 - 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
  },
});
