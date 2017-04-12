import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
    }
  }

  signupPressedRedux(){
    this.props.invokeSignup({name: this.state.name, username: this.state.username, password: this.state.password, email: this.state.email}).then( () => {
        this.validateSignup();    
      });
  }

  validateSignup(){
    if(this.props.signupReducers.status === 'success') {
      {Actions.rootTabBar({type: ActionConst.POP_AND_REPLACE})}
    } else {
      console.log('I failed');
    }
  }

  render(){
    const { name, username, password, email } = this.state;
    const {routes} = this.context;
    console.log('this: ', this);
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
          returnKeyType='send'
          placeholder='name'
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput style={styles.textInput}
          returnKeyType='send'
          placeholder='username'
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput style={styles.textInput}
          returnKeyType='send'
          placeholder='password'
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />    
        <TextInput style={styles.textInput}
          returnKeyType='send'
          placeholder='email'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TouchableOpacity onPress={() => this.signupPressedRedux({ name ,username, password, email })} style={styles.button}>
            <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: 400,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  button: {
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: 'black',
  },
  buttonText: {
      color: 'white',
  }
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, signupReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Signup);
