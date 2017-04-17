import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import ActionCreators from '../actions/index';
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
  Dimensions,  
} from 'react-native';

import NavBar from './NavBar';
import TabBar from './TabBar';
import Filter from './Filter';

const { width , height } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     marginTop: 20,
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//   }
// });

class Home extends Component {
  componentDidMount() {
    // get location
    this.props.getLocation();
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar />
        <ScrollView style={styles.homeBodyContainer}>
          <Text style={{color: '#FFF', fontSize: 25}}>Something amazing is going to be here... Just be patient</Text>
        </ScrollView>
        <TabBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1bdafc',
  },
  homeBodyContainer: {
    flex: 1,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, signupReducers, eventsReducers}) => { return {routes, loginReducers, signupReducers, eventsReducers}; }, mapDispatchToProps)(Home);
