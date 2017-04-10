import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Search from './Search';

class Event extends Component {
  render() {
    console.log(this);
    return (
      <View style={styles.container}>
        <Search />
        <Text style={styles.welcome}>
          { `This is the ${ this.props.title }` }
        </Text>
        <Text style={styles.welcome}
          onPress={() => Actions.pop()}>
          Close User
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

export default connect(({routes}) => ({routes}))(Event);
