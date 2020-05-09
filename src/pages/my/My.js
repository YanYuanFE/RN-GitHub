import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
// import {ImmediateCheckCodePush} from 'react-native-code-push-dialog';
import NavigationBar from '../../components/NavigationBar';
import {TYPE_LANGUAGE} from '../../services/LanguageService';
// import NavigationService from '../../services/NavigationService';
import {useTheme} from '../../context/themeContext';

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

export default My;

const My = () => {
  const theme = useTheme();
  const handleClick = (target) => {
    console.log(this.props);
    // NavigationService.navigate(target.component, {
    //   data: {
    //     ...target,
    //     theme,
    //   },
    // });
  };

  const handleUpdate = () => {
    // ImmediateCheckCodePush();
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme}]}>
      <View style={styles.container}>
        <NavigationBar
          style={{backgroundColor: theme}}
          title={'我的'}
          statusBar={{backgroundColor: theme}}
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
                <Icon name={'logo-github'} color={theme} size={40} />
                <Text>RN-GitHub</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.groupTitle}>最热管理</Text>
          <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_TAG)}>
            <View style={styles.group}>
              <Text style={styles.title}>自定义标签</Text>
              <Icon name={'ios-arrow-forward'} color={theme} size={25} />
            </View>
          </TouchableOpacity>
          <Text style={styles.groupTitle}>趋势管理</Text>
          <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_LANGUAGE)}>
            <View style={styles.group}>
              <Text style={styles.title}>自定义语言</Text>
              <Icon name={'ios-arrow-forward'} color={theme} size={25} />
            </View>
          </TouchableOpacity>
          <Text style={styles.groupTitle}>设置</Text>
          <TouchableOpacity onPress={() => handleClick(MENU.CUSTOM_THEME)}>
            <View style={styles.group}>
              <Text style={styles.title}>主题设置</Text>
              <Icon name={'ios-arrow-forward'} color={theme} size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate}>
            <View style={styles.group}>
              <Text style={styles.title}>检查更新</Text>
              <Icon name={'ios-arrow-forward'} color={theme} size={25} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
