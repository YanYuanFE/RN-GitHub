import React, { Component } from 'react';
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

export default class NavigationBar extends Component {
  static propTypes = {
    style: View.propTypes.style,
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
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false
    }
  }

  render() {
    let sattus = <View style={styles.statusBar}><StatusBar {...this.props.statusBar}/></View>
    let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
    let content =
      <View>
        {this.props.leftButton}
        <View style={styles.titleViewContainer}>
          {titleView}
        </View>
        {this.props.rightButton}
      </View>;

    return <View style={styles.container}>
      <StatusBar/>
      {content}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3'
  },
  navBar: {
    justifyContent: 'space-between',
    alignItems:'center',
    height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
    backgroundColor: '#2196F3',
    flexDirection: 'row'
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
  }
});
