import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LanguageService from '../../services/LanguageService';
import {useTheme} from '@react-navigation/native';

const screenW = Dimensions.get('window').width;

const Tag = ({route, navigation}) => {
  const {colors} = useTheme();
  const {title, flag} = route.params;
  const languageService = new LanguageService(flag);

  const [dataList, setData] = useState([]);

  useEffect(() => {
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
    const list = dataList.map((item) => {
      return item.name === data.name
        ? {
            ...data,
            checked: !data.checked,
          }
        : item;
    });
    setData(list);
  };

  const handleSave = useCallback(() => {
    const cb = () => {
      DeviceEventEmitter.emit(flag + '_CHANGED');
      navigation.goBack();
    };

    languageService.saveData(dataList, cb);
  }, [dataList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={{color: '#FFF', marginRight: 10}}>保存</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave, title]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {dataList.map((item, index) => {
          return (
            <View key={item.name} style={styles.item}>
              <CheckBox
                tintColors={{
                  true: colors.primary,
                }}
                onCheckColor={colors.primary}
                onTintColor={colors.primary}
                value={item.checked}
                onValueChange={() => handleChange(item)}
              />
              <Text style={styles.text}>{item.name}</Text>
            </View>
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
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  item: {
    width: screenW / 2 - 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
});
