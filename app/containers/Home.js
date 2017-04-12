import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import ActionCreators from '../actions/index';
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
import Search from './Search';

class Home extends Component {
  render() {
    console.log('this', this);
    return (
      <View style={styles.container}>
        <Search />
        <Text style={styles.welcome}>Home</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#bb0000',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Home);
