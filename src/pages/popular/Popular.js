import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PopularTab from './PopularTab';
import NavigationBar from '../../components/NavigationBar';
import LanguageService, {TYPE_LANGUAGE} from '../../services/LanguageService';
// import NavigationService from '../../services/NavigationService';
import {useTheme} from '../../context/themeContext';

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_KEY);

const Popular = ({navigation}) => {
  const [languages, setLanguages] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleClick = useCallback(() => {
    navigation.navigate('Search');
  }, []);
  const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '最热',
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <TouchableOpacity onPress={handleClick} style={styles.search}>
          <Icon name={`${iconType}-search`} color={'#FFF'} size={25} />
        </TouchableOpacity>
      ),
    });
  }, [handleClick, theme]);

  const mapRoute = languages.reduce((map, item) => {
    const route = () => <PopularTab tabLabel={item.name} />;
    return {
      ...map,
      [item.name]: route,
    };
  }, {});

  return (
    <View style={styles.container}>
      <NavigationBar
        style={{backgroundColor: theme.primary}}
        title={'最热'}
        statusBar={{backgroundColor: theme.primary}}
        rightButton={
          <TouchableOpacity onPress={handleClick} style={styles.search}>
            <Icon name={`${iconType}-search`} color={'#FFF'} size={25} />
          </TouchableOpacity>
        }
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap(mapRoute)}
          onIndexChange={(index) => setIndex(index)}
          initialLayout={{width: Dimensions.get('window').width}}
          renderTabBar={(props) => (
            <TabBar
              scrollEnabled={true}
              {...props}
              indicatorStyle={{backgroundColor: 'white'}}
              style={{backgroundColor: theme.primary}}
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
  );
};

export default Popular;

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
  tabContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  tabList: {
    height: 600,
  },
  search: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
