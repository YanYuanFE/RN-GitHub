import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import TrendingTab from './TrendingTab';
import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import LanguageService, { TYPE_LANGUAGE } from '../../services/LanguageService';

const languageService = new LanguageService(TYPE_LANGUAGE.FLAG_LANGUAGE);
const sinceList = [{
  label: '今日',
  value: 'daily'
}, {
  label: '本周',
  value: 'weekly'
}, {
  label: '本月',
  value: 'monthly'
}];
export default class Trending extends PureComponent {
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
    loading: true,
    since: sinceList[0],
    toolTipVisible: false
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

  renderTitle = () => {
    const { since } = this.state;
    const sinceView = (
      <View>
        {
          sinceList.map(item => <TouchableOpacity><Text>{item.label}</Text></TouchableOpacity>)
        }
      </View>
    );
    return (
      <View>
        <Tooltip
          animated
          isVisible={this.state.toolTipVisible}
          content={sinceView}
          placement="bottom"
          onClose={() => this.setState({ toolTipVisible: false })}
          >
          <TouchableOpacity style={styles.titleView} onPress={() => this.setState({ toolTipVisible: true })}>
            <Text style={styles.title}>{`趋势 ${since.label}`}</Text>
            <Icon name={'ios-arrow-down'} color={'#FFF'} size={12}/>
          </TouchableOpacity>
        </Tooltip>
      </View>
    )
  }
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
            titleView={this.renderTitle()}
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
  titleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400'
  },
  tabContainer: {
    flex:1,
    backgroundColor: 'red'
  },
  tabList: {
    height:600
  }
});
