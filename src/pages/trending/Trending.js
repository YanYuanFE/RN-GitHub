import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';
import PopularTab from "../popular/Popular";


const JavaRoute = () => <TrendingTab tabLabel="Java">Java</TrendingTab>;
const JSRoute = () => <TrendingTab tabLabel="JavaScript">JavaScript</TrendingTab>;
const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_LANGUAGE);
export default class Trending extends PureComponent {
  constructor(props) {
    super(props);
    this.loadLanguage();
  }
  state = {
    index: 0,
    routes: [
      { key: 'Java', title: 'Java' },
      { key: 'JavaScript', title: 'JavaScript' },
    ],
    languages: [],
    loading: true
  };
  loadLanguage = () => {
    this.setState({loading: true});
    languageService.fetchData().then(languages => {
      this.setState({
        languages,
        routes: languages.map(language => ({key: language.name, title: language.name})),
        loading: false
      });
    }).catch(error => {
      console.log(error);
    });
  };
  render() {
    const { index, routes, languages, loading } = this.state;
    const map = {};
    languages.forEach((language) => {
      const LanguageRoute = () => <PopularTab tabLabel={language.name} />;
      map[language.name] = LanguageRoute;
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{backgroundColor: "#2196F3"}}
          title={'趋势'}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        {
          loading ? <ActivityIndicator/> :
            <TabView
              navigationState={{index, routes}}
              renderScene={SceneMap(map)}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={(props) =>
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: 'white' }}
                  style={{ backgroundColor: '#2196F3' }}
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
}




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
  }
});
