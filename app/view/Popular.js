import React, { Component } from 'react';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Popular extends Component {

  render() {
    return <View>
      <ScrollableTabBar>
          <Text tabLabel="Java">Java</Text>
      </ScrollableTabBar>
    </View>;
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
