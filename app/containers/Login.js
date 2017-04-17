import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';

const { width , height } = Dimensions.get("window");

const background = require("../assets/image/login1_bg.png");
const backIcon = require("../assets/image/back.png");
const lockIcon = require("../assets/image/login1_lock.png");
const personIcon = require("../assets/image/login1_person.png");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  loginPressedRedux(){
    var login = this.props.invokeLogin({username: this.state.username, password: this.state.password}).then( () => {
        this.validateLogin();    
      });
  }

  validateLogin(){
    if(this.props.loginReducers.status === 'success') {
      {Actions.home()}
    } else {
      //TODO: Create some sort of visual representation of a failure
      console.log('I failed');
    }
  }

  // Back Button Render
  // <View style={styles.headerIconView}>
  //   <TouchableOpacity style={styles.headerBackButtonView} onPress={() => {Actions.pop()}}>
  //     <Image 
  //       source={backIcon} 
  //       style={styles.backButtonIcon} 
  //       resizeMode="contain"
  //     />
  //   </TouchableOpacity>
  // </View>

 render() {
    return (
      <View style={styles.container}>
        <Image source={background} 
        style={[styles.container, styles.bg]} 
        resizeMode="cover">
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Login</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                style={styles.input} 
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}                
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}                 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={() => this.loginPressedRedux()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>{'Don\'t have an account?'}</Text>
              <TouchableOpacity activeOpacity={.5} onPress={() => {Actions.signup()}}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },  
  headerContainer: {
    flex: 1,
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },  
  background: {
    paddingTop: 30,
    width: null,
    height: null
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#efb358",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Login);
