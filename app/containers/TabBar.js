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

class TabBar extends Component {
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
        <View style={styles.tabBarContainer}>
          <View style={styles.tabContainer}>
            <View style={styles.tabIconView}>
              <TouchableOpacity style={styles.iconButton} onPress={() => {Actions.home()}}>
                <Icon name='home' style={styles.tabIconView} size={30} color="white" resizeMode="contain" />
                <Text style={styles.tabIconName}>Home</Text>
              </TouchableOpacity>            
            </View>
          </View>
          <View style={styles.tabContainer}>
            <View style={styles.tabIconView}>
              <TouchableOpacity style={styles.iconButton} onPress={() => {Actions.event()}}>
                <Icon name='calendar' style={styles.tabIconView} size={30} color="white" resizeMode="contain" />
                <Text style={styles.tabIconName}>Events</Text>
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
    // flex: 1
  },
  tabBarContainer: {
    display: 'flex',
    height: 60,
    padding: 5,
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  tabContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',   
  }, 
  tabIconView: {  
  },
  iconButton: {
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',        
  },
  tabIconName: {
    color: '#FFF',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(TabBar);