import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { WebView } from 'react-native-webview';

export default class WebPage extends PureComponent {
  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url');
    const title = navigation.getParam('title');
    console.log(this.props);

    return (
      <View style={styles.listView_container}>
          <NavigationBar
            title={title}
            popEnabled={false}
            style={{backgroundColor: "#2196F3"}}
            statusBar={{backgroundColor: '#2196F3'}}
          />
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
  }
});