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

        <TouchableOpacity onPress={() => this.loginPressedRedux({ username, password })} style={styles.button}>
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

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

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Login);
