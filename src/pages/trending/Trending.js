import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_LANGUAGE);
export default class Trending extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const iconType = Platform.OS === 'IOS' ? 'ios' : 'md';
      return {
        title: '趋势',
        headerStyle: {
            backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <TouchableOpacity onPress={navigation.push('save')}>
                <Icon name={`${iconType}-search`} color={'#FFF'} size={25} />
            </TouchableOpacity>
        )
      }
  }
  constructor(props) {
    super(props);
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

  componentDidMount(): void {
    this.loadLanguage();
  }

  loadLanguage = () => {
    this.setState({loading: true});
    languageService.fetchData().then(result => {
      const languages = result.filter(item => item.checked);
      console.log(languages);
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
      const LanguageRoute = () => <TrendingTab tabLabel={language.name} />;
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
                  scrollEnabled={true}
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
