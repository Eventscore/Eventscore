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

const background = require("../assets/image/SeaBlue.jpg");
const backIcon = require("../assets/image/back.png");
const personIcon = require("../assets/image/signup_person.png");
const lockIcon = require("../assets/image/signup_lock.png");
const emailIcon = require("../assets/image/signup_email.png");
const birthdayIcon = require("../assets/image/signup_birthday.png");

const { width , height } = Dimensions.get("window");

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
    const { name, username, password, email } = this.state;
    const {routes} = this.context;      
    return (
      <View style={styles.container}>
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>
          </View>
          <View style={styles.inputsContainer}>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Name"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={emailIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={lockIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF" 
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={birthdayIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Username"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
              />
            </View>

          </View>

          <View style={styles.footerContainer}>

            <TouchableOpacity onPress={() => this.signupPressedRedux({ name ,username, password, email })}>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Join</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.login()}}>
              <View style={styles.signin}>
                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#efb358',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers}) => { return {routes, loginReducers, signupReducers, eventsReducers}}, mapDispatchToProps)(Signup);
