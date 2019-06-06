import React, { PureComponent } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
	StyleSheet,
	View,
	Text,
	Dimensions
} from 'react-native';
import FavoriteTab from './FavoriteTab';
import NavigationBar from '../../components/NavigationBar';
import { TYPE } from '../../services/RepositoryService';
import { ThemeContext } from '../../context/themeContext';


const PopularRoute = () => <FavoriteTab tabLabel="Popular" type={TYPE.Popular} />;
const TrendingRoute = () => <FavoriteTab tabLabel="Trending" type={TYPE.Trending} />;

export default class Favorite extends PureComponent {
	state = {
		index: 0,
		routes: [
			{ key: 'Popular', title: '最热' },
			{ key: 'Trending', title: '趋势' },
		],
	};
	static contextType = ThemeContext;

	render() {
		const { theme } = this.context;
		return (
			<View style={styles.container}>
				<NavigationBar
					style={{backgroundColor: theme}}
					title={'喜欢'}
					statusBar={{backgroundColor: theme}}
				/>
				<TabView
					navigationState={this.state}
					renderScene={SceneMap({
						Popular: PopularRoute,
						Trending: TrendingRoute,
					})}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{ width: Dimensions.get('window').width }}
					renderTabBar={(props) =>
						<TabBar
							{...props}
							indicatorStyle={{ backgroundColor: 'white' }}
							style={{ backgroundColor: theme }}
							renderLabel={({ route, focused, color }) => (
								<Text style={{ color: focused ? "#F5F5F5" : color, margin: 0 }}>
									{route.title}
								</Text>
							)}
						/>
					}
				>
				</TabView>
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
	tabContainer: {
		flex:1,
		backgroundColor: 'red'
	},
	tabList: {
		height:600
	}
});
