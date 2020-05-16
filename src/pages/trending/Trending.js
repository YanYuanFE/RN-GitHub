import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageService, {TYPE_LANGUAGE} from '../../services/LanguageService';
import {useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
  const [loading, setLoading] = useState(false);
  const [since, setSince] = useState(sinceList[0]);
  const {colors} = useTheme();

  useEffect(() => {
    loadLanguage();
    const listener = DeviceEventEmitter.addListener(
      TYPE_LANGUAGE.FLAG_LANGUAGE + '_CHANGED',
      loadLanguage,
    );

    return () => {
      listener.remove();
    };
  }, []);

  const loadLanguage = () => {
    setLoading(true);
    languageService
      .fetchData()
      .then((result) => {
        const data = result.filter((item) => item.checked);
        setLanguages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSinceChange = (item) => setSince(item);

  const mapRoute = languages.reduce((map, item) => {
    const route = () => <TrendingTab tabLabel={item.name} since={since} />;
    return {
      ...map,
      [item.name]: route,
    };
  }, {});

  return (
    <View style={styles.container}>
      <NavigationBar
        style={{backgroundColor: colors.primary}}
        titleView={
          <SinceView
            since={since}
            onChange={handleSinceChange}
            colors={colors}
          />
        }
        statusBar={{backgroundColor: colors.primary}}
      />
      {loading || languages.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <Tab.Navigator tabBarOptions={{scrollEnabled: true}}>
          {Object.keys(mapRoute).map((name) => (
            <Tab.Screen name={name} component={mapRoute[name]} key={name} />
          ))}
        </Tab.Navigator>
      )}
    </View>
  );
};

export default Trending;

const SinceView = ({onChange, since, colors}) => {
  const [toolTipVisible, setVisible] = useState(false);

  const togglePopover = () => {
    setVisible(!toolTipVisible);
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
          <Text style={[styles.sinceText, {color: colors.primary}]}>
            {item.label}
          </Text>
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
