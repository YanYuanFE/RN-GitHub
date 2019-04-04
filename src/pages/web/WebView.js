import React, { PureComponent } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet, StatusBar, Platform
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { WebView } from 'react-native-webview';

export default class WebPage extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerStyle: {
                backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };
    render() {
        const { navigation } = this.props;
        const url = navigation.getParam('url');
        console.log(this.props);

        return (
          <View style={styles.listView_container}>
              <StatusBar barStyle="light-content" />
              <WebView
                  source={{uri: url}}
                  style={{marginTop: 0}}
                  startInLoadingState={true}
                  renderLoading={() => <ActivityIndicator />}
                  onError={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                  }}
              />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    listView_container:{
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 44 : 0
    }
});