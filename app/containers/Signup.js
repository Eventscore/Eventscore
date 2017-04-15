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
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            returnKeyType='next'
            placeholder='name'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <TextInput style={styles.textInput}
            returnKeyType='next'
            placeholder='username'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput style={styles.textInput}
            returnKeyType='next'
            placeholder='password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />    
          <TextInput style={styles.textInput}
            returnKeyType='done'
            placeholder='email'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>
        <View style={styles.backdropView}>
          <TouchableOpacity onPress={() => this.signupPressedRedux({ name ,username, password, email })} style={styles.button}>
              <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
          <View>
            <View style={{height: 10}}></View>
            <Text style={styles.Text} onPress={() => {Actions.pop()}}>CANCEL</Text>
          </View>                
        </View>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // maxHeight: 400,
    // alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
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
  }
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, signupReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Signup);
