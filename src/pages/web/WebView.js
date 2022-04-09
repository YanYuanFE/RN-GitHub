import React, {useLayoutEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

const WebPage = ({navigation, route}) => {
  const {url, title} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title]);

  return (
    <View style={styles.container}>
      <WebView
          style={styles.view}
        source={{uri: url}}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator />}
        onError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

export default WebPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4',
  },
  view: {
    flex: 1,
  },
});
