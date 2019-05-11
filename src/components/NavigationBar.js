import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar
} from 'react-native';
const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf('default', 'light-content', 'drak-content'),
  hidden: PropTypes.bool
}

export default class NavigationBar extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape()
  }

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    },
    style: {
      backgroundColor: "red"
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false
    }
  }

  getButtonElement = (data) => {
    console.log(data);
    return (
      <View style={styles.navBarButton}>
        {data ? data : null }
      </View>
    );
  };

  render() {
    const { statusBar, leftButton, rightButton, title, hide } = this.props;
    let statusBarComp = !statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar
          {...statusBar}
          barStyle="light-content"
        />
      </View> : null;
    let titleView = <Text style={styles.title}>{title}</Text>;
    let content = hide ? null :
      <View style={styles.navBar}>
        {this.getButtonElement(leftButton)}
        <View style={styles.titleViewContainer}>
          {titleView}
        </View>
        {this.getButtonElement(rightButton)}
      </View>;

    return (
      <View style={[styles.container, this.props.style]}>
        {statusBarComp}
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3'
  },
  navBar: {
    alignItems:'center',
    height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
    flexDirection: 'row'
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
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
  },
  navBarButton: {
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
});
