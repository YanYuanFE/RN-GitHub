import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';

export default class Toolbar extends Component {

  constructor(props) {
    super(props);

    let { params } = this.props.navigation.state;
    this.state = {
      title: params.title,
    };
  }

  pressUser = () => {
    this.navigate('User', {
      title: '',
    });
  }

  pressBack = () => {
    this.props.navigation.goBack();
  }

  pressSearch = () => {
    this.navigate('Search', {
      title: '',
    });
  }

  render() {
    let inHome = this.props.inHome;
    let onlyLeft = this.props.onlyLeft;

    return (
      <View style = {[styles.box, this.props.bgColor ? {backgroundColor: this.props.bgColor,borderColor: 'rgba(0,0,0,0)'} : {}]}>
        <TouchableWithoutFeedback
          onPress={inHome ? this.pressUser : this.pressBack}>
          <View style={styles.iconBtn}>
            <Image style={styles.iconStyle}
                   source={inHome ? require('../assets/ic_account_circle.png') : require('../assets/ic_arrow_back.png')} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{flex: 1}}/>
        <Text style={styles.titleText}>{this.state.title}</Text>
        <View style={{flex: 1}}/>
        <View>
          {
            onlyLeft ? (<View/>) : (
              <TouchableWithoutFeedback
                onPress={inHome ? this.pressSearch : this.pressShare}>
                <View style={styles.iconBtn}>
                  <Image style={styles.iconStyle}
                         source={inHome ? require('../assets/ic_search.png') : require('../assets/ic_share.png')}/>
                </View>
              </TouchableWithoutFeedback>
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  box: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderBottomWidth: 0.5,
    borderColor: '#DDDDDD',
  },
  titleText: {
    color: '#FFF',
    fontSize: 16,
  },
  iconBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  }
})
