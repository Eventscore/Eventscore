import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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

import Icon from 'react-native-vector-icons/FontAwesome';
const { width , height } = Dimensions.get("window");

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  //Menu Button
  // <TouchableOpacity style={styles.navLeftIconButton} onPress={() => {Actions.home()}}>
  //   <Icon name='bars' style={styles.navLeftIconView} size={30} color="white" resizeMode="contain" />
  // </TouchableOpacity>
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBarContainer}>
          <View style={styles.navLeftContainer}>
            <View style={styles.navLeftIconView}>
            </View>
          </View>        
          <View style={styles.navRightContainer}>
            <View style={styles.navRightIconView}>
              <TouchableOpacity style={styles.navRightIconButton} onPress={() => {Actions.filter()}}>
                <Icon name='search' style={styles.navRightIconView} size={30} color="white" resizeMode="contain" />  
              </TouchableOpacity>
            </View>        
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  },
  navBarContainer: {
    display: 'flex',
    height: 40,
    padding: 5,
    marginTop: 20, 
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  navLeftContainer: {
    backgroundColor: 'transparent',    
  },
  navLeftIconView: {
    paddingLeft: 5, 
  },
  navLeftIconButton: {
    backgroundColor: 'transparent',    
  },
  navRightContainer: {
    backgroundColor: 'transparent',    
  },
  navRightIconView: {
    paddingRight: 5, 
  },
  navRightIconButton: {
    backgroundColor: 'transparent',    

  },  
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(NavBar);