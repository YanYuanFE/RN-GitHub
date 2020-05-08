import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Text, Platform, StatusBar} from 'react-native';
const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf('default', 'light-content', 'drak-content'),
  hidden: PropTypes.bool,
};

export default NavigationBar;

const NavigationBar = ({
  statusBar = {
    barStyle: 'light-content',
    hidden: false,
  },
  leftButton,
  rightButton,
  title,
  hide,
  titleView,
  style,
}) => {
  const getButtonElement = (data) => {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  };

  let statusBarComp = !statusBar.hidden ? (
    <View style={styles.statusBar}>
      <StatusBar {...statusBar} barStyle="light-content" />
    </View>
  ) : null;
  let titleContent = titleView || <Text style={styles.title}>{title}</Text>;
  let content = hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(leftButton)}
      <View style={styles.titleViewContainer}>{titleContent}</View>
      {getButtonElement(rightButton)}
    </View>
  );

  return <View style={[styles.container, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
  },
  navBar: {
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
    flexDirection: 'row',
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
  navBarButton: {
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
});
