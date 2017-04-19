import React, { Component } from 'react';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import NavBar from './NavBar';
import TabBar from './TabBar';

class User extends Component {
  render() {
    const user = this.props.loginReducers;
    return (
      <View style={styles.container}>
        <NavBar />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.welcome}> Name: {user.username} </Text>
          <TouchableOpacity style={styles.button} onPress={() => {Actions.eventlistmapworking({type: ActionConst.PUSH})}}>
            <Text style={styles.buttonText}> BigMap </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {Actions.eventlistmap({type: ActionConst.PUSH})}}>
            <Text style={styles.buttonText}> Map2 </Text>
          </TouchableOpacity>
        </ScrollView>
        <TabBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'gold',
  },
  scrollView: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    color: '#ffffff',
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'white',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers}) => { return {routes, loginReducers, signupReducers, eventsReducers}; }, mapDispatchToProps)(User);
