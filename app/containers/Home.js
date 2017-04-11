import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import ActionCreators from '../actions/index';
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
        <Text onPress={Actions.login}>Open modal</Text>
      </View>
    )
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

// Enter data you want to send from the store to the component below
// function mapStateToProps(state) {
//   return {
//     searchedEvents: state.searchedEvents
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

//React Native Router Flux
export default connect(({routes}) => ({routes}))(Home)
