import React, { PureComponent } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import PopularTab from './PopularTab';
import NavigationBar from '../../components/NavigationBar';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';
import NavigationService from '../../services/NavigationService';
import { ThemeContext } from '../../context/themeContext';


const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_KEY);

export default class Popular extends PureComponent {
  constructor(props) {
    super(props);
  }
  static contextType = ThemeContext;
  state = {
    languages: [],
    index: 0,
    routes: [],
    loading: true
  };

  componentDidMount(): void {
    this.loadLanguage();
  }

  loadLanguage = () => {
    this.setState({loading: true});
    languageService.fetchData().then(result => {
      const languages = result.filter(item => item.checked);
      this.setState({
        languages,
        routes: languages.map(language => ({key: language.name, title: language.name})),
        loading: false
      });
    }).catch(error => {
      console.log(error);
    });
  };

  handleClick = () => {
    NavigationService.navigate('Search');
  };

  render() {
    const { index, routes, languages, loading } = this.state;
    const { theme } = this.context;
    const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';
    const mapRoute = languages.reduce((map, item) => {
      const route = () => <PopularTab tabLabel={item.name} />;
      return {
        ...map,
        [item.name]: route
      }
    }, {});

    return (
      <View style={styles.container}>
        <NavigationBar
            style={{backgroundColor: theme}}
            title={'最热'}
            statusBar={{backgroundColor: theme}}
            rightButton={
              <TouchableOpacity onPress={this.handleClick} style={styles.search}>
                <Icon name={`${iconType}-search`} color={'#FFF'} size={25} />
              </TouchableOpacity>
            }
        />
        {
          loading ? <ActivityIndicator /> :
            <TabView
              navigationState={{index, routes}}
              renderScene={SceneMap(mapRoute)}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={(props) =>
                <TabBar
                  scrollEnabled={true}
                  {...props}
                  indicatorStyle={{ backgroundColor: 'white' }}
                  style={{ backgroundColor: theme }}
                  renderLabel={({ route, focused, color }) => (
                    <Text style={{ color: focused ? "#F5F5F5" : color, margin: 0 }}>
                      {route.key}
                    </Text>
                  )}
                />
              }
            />
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex:1,
    backgroundColor: 'red'
  },
  tabList: {
    height:600
  },
  search: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
