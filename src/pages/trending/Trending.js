import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Tooltip from 'react-native-walkthrough-tooltip';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import LanguageService, {TYPE_LANGUAGE} from '../../services/LanguageService';
import {ThemeContext, useTheme} from '../../context/themeContext';

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_LANGUAGE);
const sinceList = [
  {
    label: '今日',
    value: 'daily',
  },
  {
    label: '本周',
    value: 'weekly',
  },
  {
    label: '本月',
    value: 'monthly',
  },
];
const Trending = () => {
  const [languages, setLanguages] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [since, setSince] = useState(sinceList[0]);
  const theme = useTheme();

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = () => {
    setLoading(true);
    languageService
      .fetchData()
      .then((result) => {
        const languages = result.filter((item) => item.checked);
        setLanguages(languages);
        setLoading(false);
        setRoutes(
          languages.map((language) => ({
            key: language.name,
            title: language.name,
          })),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTabChange = (index) => setIndex(index);

  const handleSinceChange = (item) => setSince(item);

  const mapRoute = languages.reduce((map, item) => {
    const route = () => <TrendingTab tabLabel={item.name} since={since} />;
    return {
      ...map,
      [item.name]: route,
    };
  }, {});
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme}]}>
      <View style={styles.container}>
        <NavigationBar
          style={{backgroundColor: theme}}
          titleView={
            <SinceView
              since={since}
              onChange={this.handleSinceChange}
              theme={theme}
            />
          }
          statusBar={{backgroundColor: theme}}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TabView
            navigationState={{index, routes}}
            renderScene={SceneMap(mapRoute)}
            onIndexChange={handleTabChange}
            initialLayout={{width: Dimensions.get('window').width}}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                scrollEnabled={true}
                indicatorStyle={{backgroundColor: 'white'}}
                style={{backgroundColor: theme}}
                renderLabel={({route, focused, color}) => (
                  <Text style={{color: focused ? '#F5F5F5' : color, margin: 0}}>
                    {route.key}
                  </Text>
                )}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Trending;

const SinceView = ({onChange, since, theme}) => {
  const [toolTipVisible, setVisible] = useState(false);

  const togglePopover = () => {
    setVisible((prevState) => {
      return !prevState.toolTipVisible;
    });
  };
  const handleClick = (item) => {
    onChange(item);
    togglePopover();
  };
  const sinceView = (
    <View style={styles.sinceView}>
      {sinceList.map((item) => (
        <TouchableOpacity
          onPress={() => handleClick(item)}
          key={item.value}
          style={styles.sinceItem}>
          <Text style={[styles.sinceText, {color: theme}]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <View>
      <Tooltip
        animated={false}
        isVisible={toolTipVisible}
        content={sinceView}
        placement="bottom"
        onClose={togglePopover}>
        <TouchableOpacity style={styles.titleView} onPress={togglePopover}>
          <Text style={styles.title}>{`趋势 ${since.label}`}</Text>
          <Icon name={'ios-arrow-down'} color={'#FFF'} size={12} />
        </TouchableOpacity>
      </Tooltip>
    </View>
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
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  tabList: {
    height: 600,
  },
  sinceText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  sinceView: {
    backgroundColor: '#FFF',
  },
  sinceItem: {
    marginTop: 10,
  },
});
