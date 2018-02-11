import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';

export default class RepoCell extends Component {
  render() {
    const { data } = this.props;
    return <View>
      <Text>{data.full_name}</Text>
      <Text>{data.description}</Text>
      <Text>{data.owner.avatar_url}</Text>
      <Text>{data.stargazers_count}</Text>
    </View>
  }
}
