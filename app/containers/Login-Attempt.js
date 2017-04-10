// import React, { PropTypes } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
// import { ActionCreators } from '../actions/index';
// import { bindActionCreators } from 'redux';

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       validating: false,
//       count: 0
//     }
//   }

//   static contextTypes = {
//     routes: PropTypes.object.isRequired,
//   };
   
//   loginPressed() {
//     this.setState({validating: true});
//     console.log('username: ', this.state.username + ' password: ', this.state.password);
//   }

//   loginPressedRedux(){
//     this.props.invokeLogin({username: this.state.username, password: this.state.password});
//   }

//   addCountRedux(){
//     this.props.addCount();
//   }

//   render(){
//     const {routes} = this.context;
//     console.log(this);
//     return (
//       <View style={styles.container}>
//         <TextInput style={styles.textInput}
//           returnKeyType='send'
//           placeholder='username'
//           onChangeText={(username) => this.setState({username})}
//           value={this.state.username}
//         />
//         <TextInput style={styles.textInput}
//           returnKeyType='send'
//           placeholder='password'
//           onChangeText={(password) => this.setState({password})}
//           value={this.state.password}
//         />    
//         <TouchableOpacity onPress={() => this.loginPressedRedux()} style={styles.button}>
//             <Text style={styles.buttonText}> Login </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => this.addCountRedux()} style={styles.button}>
//             <Text style={styles.buttonText}> {} </Text>
//         </TouchableOpacity>          
//       </View>
//     )    
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 80,
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     maxHeight: 400,
//     alignItems: 'center',
//   },
//   textInput: {
//     flex: 1,
//     alignItems: 'center',
//     textAlign: 'center',
//     alignSelf: 'stretch',
//   },
//   button: {
//       padding: 5,
//       borderWidth: 1,
//       borderRadius: 5,
//       backgroundColor: 'black',
//   },
//   buttonText: {
//       color: 'white',
//   }
// })

// // export default connect(({routes}) => ({routes}))(Login)

// function mapDispatchToProps(dispatch){
//   console.log(ActionCreators);
//   return bindActionCreators(ActionCreators, dispatch);
// }

// export default connect(() => { return {} }, mapDispatchToProps)(Login);
