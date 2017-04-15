import React, { Component } from 'react';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Graph from './Graph';

class User extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          { `This is the ${ this.props.title }` }
        </Text>
        <Text style={styles.welcome}
          onPress={() => Actions.pop()}>
          Close User
        </Text>
        <Graph/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'gold',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, signupReducers, eventsReducers, addCountExample}; }, mapDispatchToProps)(User);
