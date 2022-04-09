import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PopularTab from './PopularTab';
import LanguageService, {TYPE_LANGUAGE} from '../../services/LanguageService';
import {useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_KEY);

const Popular = ({navigation}) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
            <TouchableOpacity onPress={handleClick} style={styles.search}>
          <Icon name={`${iconType}-search`} color={colors.primary} size={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  useEffect(() => {
    loadLanguage();
    const listener = DeviceEventEmitter.addListener(
      TYPE_LANGUAGE.FLAG_KEY + '_CHANGED',
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

  const handleClick = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';

  const mapRoute = languages.reduce((map, item) => {
    const route = () => <PopularTab tabLabel={item.name} />;
    return {
      ...map,
      [item.name]: route,
    };
  }, {});

  return (
    <View style={styles.container}>
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
    backgroundColor: '#FFF',
  },
});
