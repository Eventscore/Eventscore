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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      // count: 0
    }
  }

  loginPressedRedux(){
    var login = this.props.invokeLogin({username: this.state.username, password: this.state.password}).then( () => {
        this.validateLogin();    
      });
  }

  validateLogin(){
    if(this.props.loginReducers.status === 'success') {
      {Actions.rootTabBar({type: ActionConst.POP_AND_REPLACE})}
    } else {
      console.log('I failed');
    }
  }

  // addCountRedux(val){
  //   this.props.addCount(val);
  // }


  render(){
    const { username, password } = this.state;
    const {routes} = this.context;
    console.log('this: ', this);
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            returnKeyType='next'
            placeholder='username'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput style={styles.textInput}
            returnKeyType='done'
            placeholder='password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />    
        </View>
        <View style={styles.backdropView}>
          <TouchableOpacity onPress={() => this.loginPressedRedux({ username, password })} style={styles.button}>
              <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
          <View>
            <View style={{height: 10}}></View>
            <Text style={styles.Text}>Forgot Password?</Text>
          </View>
        </View>
      </View>
    )    
  }
}

/*
//addCountExample
<TouchableOpacity onPress={() => this.addCountRedux(this.props.addCountExample.count)} style={styles.button}>
    <Text style={styles.buttonText} value={this.props.addCountExample.count}> {this.props.addCountExample.count} </Text>
</TouchableOpacity>
*/

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxHeight: 300,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  backdropView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 150,
  },
  button: {
    width: 300,
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Login);
