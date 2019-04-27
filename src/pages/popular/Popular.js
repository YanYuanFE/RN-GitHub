import React, { PureComponent } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PopularTab from './PopularTab';
import NavigationBar from '../../components/NavigationBar';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_KEY);
export default class Popular extends PureComponent {
  constructor(props) {
    super(props);
  }
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
          title={'最热'}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        {
          loading ? <ActivityIndicator /> :
            <TabView
              navigationState={{index, routes}}
              renderScene={SceneMap(map)}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={(props) =>
                <TabBar
                  scrollEnabled={true}
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
