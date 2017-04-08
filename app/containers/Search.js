import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ReactNative from 'react-native';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Search
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcb05',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

export default connect(({routes}) => ({routes}))(Search)