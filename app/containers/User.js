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
import { Actions, ActionConst } from 'react-native-router-flux';
import Graph from './Graph';
import LocationMap from './Map';
import Icon from 'react-native-vector-icons/FontAwesome';



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

        <ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={styles.scrollview}
        >
          <LocationMap/>
          <TouchableOpacity style={styles.button} onPress={() => {Actions.eventlistmapworking({type: ActionConst.PUSH})}}>
            <Icon name='chevron-right' size={15} style={styles.chevronLeft} />   
            <Text style={styles.buttonText}> BigMap </Text>
          </TouchableOpacity>
          <Graph/>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black', 
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, signupReducers, eventsReducers, addCountExample}; }, mapDispatchToProps)(User);
