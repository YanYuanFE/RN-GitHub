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
        source={{uri: url}}
        style={{marginTop: 0}}
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
  statusBar: {
    height: Platform.OS === 'ios' ? 44 : 0,
  },
});
