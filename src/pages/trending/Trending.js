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
import { ThemeContext } from '../../context/themeContext';


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
  static contextType = ThemeContext;
  state = {
    index: 0,
    routes: [
      { key: 'Java', title: 'Java' },
      { key: 'JavaScript', title: 'JavaScript' },
    ],
    languages: [],
    loading: true,
    since: sinceList[0],
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

  handleTabChange = index => this.setState({ index });

  handleSinceChange = (item) => this.setState({since: item});

  render() {
    const { index, routes, languages, loading, since } = this.state;
    const { theme } = this.context;
    const mapRoute = languages.reduce((map, item) => {
      const route = () => <TrendingTab tabLabel={item.name} since={since} />;
      return {
        ...map,
        [item.name]: route
      }
    }, {});
    return (
      <View style={styles.container}>
        <NavigationBar
            style={{backgroundColor: theme}}
            titleView={<SinceView since={since} onChange={this.handleSinceChange} theme={theme} />}
            statusBar={{backgroundColor: theme}}
        />
        {
          loading ? <ActivityIndicator/> :
            <TabView
              navigationState={{index, routes}}
              renderScene={SceneMap(mapRoute)}
              onIndexChange={this.handleTabChange}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={(props) =>
                <TabBar
                  {...props}
                  scrollEnabled={true}
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
}

class SinceView extends PureComponent {
  state = {
    toolTipVisible: false
  };
  togglePopover = () => {
    this.setState((prevState) => {
      return { toolTipVisible: !prevState.toolTipVisible }
    })
  };
  handleClick = (item) => {
    const { onChange } = this.props;
    onChange(item);
    this.togglePopover();
  };
  render() {
    const { toolTipVisible } = this.state;
    const { since, theme } = this.props;
    const sinceView = (
        <View style={styles.sinceView}>
          {
            sinceList.map(item => (
                <TouchableOpacity onPress={() => this.handleClick(item)} key={item.value} style={styles.sinceItem}>
                  <Text style={[styles.sinceText, {color: theme}]}>{item.label}</Text>
                </TouchableOpacity>
            ))
          }
        </View>
    );
    return (
        <View>
          <Tooltip
              animated={false}
              isVisible={toolTipVisible}
              content={sinceView}
              placement="bottom"
              onClose={this.togglePopover}
          >
            <TouchableOpacity style={styles.titleView} onPress={this.togglePopover}>
              <Text style={styles.title}>{`趋势 ${since.label}`}</Text>
              <Icon name={'ios-arrow-down'} color={'#FFF'} size={12}/>
            </TouchableOpacity>
          </Tooltip>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFF'
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
  },
  sinceText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  sinceView: {
    backgroundColor: '#FFF'
  },
  sinceItem: {
    marginTop: 10
  }
});
