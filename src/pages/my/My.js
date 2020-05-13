import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import {TYPE_LANGUAGE} from '../../services/LanguageService';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const MENU = {
  CUSTOM_TAG: {
    title: '自定义标签',
    component: 'Tag',
    flag: TYPE_LANGUAGE.FLAG_KEY,
  },
  CUSTOM_LANGUAGE: {
    title: '自定义语言',
    component: 'Tag',
    flag: TYPE_LANGUAGE.FLAG_LANGUAGE,
  },
  CUSTOM_THEME: {
    title: '主题设置',
    component: 'Theme',
    flag: 'TYPE_THEME',
  },
};

const My = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const handleClick = (target) => {
    navigation.push(target.component, {
      ...target,
    });
  };

  const handleUpdate = () => {
    // ImmediateCheckCodePush();
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        style={{backgroundColor: colors.primary}}
        title={'我的'}
        statusBar={{backgroundColor: colors.primary}}
      />
      <ScrollView>
        <TouchableOpacity>
          <View style={[styles.item, {height: 90}]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Icon name={'logo-github'} color={colors.primary} size={40} />
              <Text>RN-GitHub</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.groupTitle}>最热管理</Text>
        <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_TAG)}>
          <View style={styles.group}>
            <Text style={styles.title}>自定义标签</Text>
            <Icon name={'ios-arrow-forward'} color={colors.primary} size={25} />
          </View>
        </TouchableOpacity>
        <Text style={styles.groupTitle}>趋势管理</Text>
        <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_LANGUAGE)}>
          <View style={styles.group}>
            <Text style={styles.title}>自定义语言</Text>
            <Icon name={'ios-arrow-forward'} color={colors.primary} size={25} />
          </View>
        </TouchableOpacity>
        <Text style={styles.groupTitle}>设置</Text>
        <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_THEME)}>
          <View style={styles.group}>
            <Text style={styles.title}>主题设置</Text>
            <Icon name={'ios-arrow-forward'} color={colors.primary} size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate}>
          <View style={styles.group}>
            <Text style={styles.title}>检查更新</Text>
            <Icon name={'ios-arrow-forward'} color={colors.primary} size={25} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default My;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',
    borderStyle: 'solid',
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: 'gray',
  },
  title: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
