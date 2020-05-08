import React, {PureComponent} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/themeContext';

const WebPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const navigationOptions = ({navigation, screenProps}) => {
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: screenProps.theme,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  const url = navigation.getParam('url');

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
