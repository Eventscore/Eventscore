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
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const { width , height } = Dimensions.get("window");

class TabBar extends Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';
  
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'More',
        notifCount: 0,
        presses: 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBarContainer}>
          <View style={styles.tabContainer}>
            <View style={styles.tabIconView}>
              <TouchableOpacity style={styles.iconButton} onPress={() => {Actions.home()}}>
                <Icon name='home' style={styles.tabIconView} size={25} color="#7a7b7c" resizeMode="contain" />
                <Text style={styles.tabIconName}>Home</Text>
              </TouchableOpacity>            
            </View>
          </View>
          <View style={styles.tabContainer}>
            <View style={styles.tabIconView}>
              <TouchableOpacity style={styles.iconButton} onPress={() => {Actions.event()}}>
                <Icon name='star-o' style={styles.tabIconView} size={25} color="#7a7b7c" resizeMode="contain" />
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
    borderStyle: 'solid',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    bottom: -3
    // padding: 10
  },
  tabBarContainer: {
    display: 'flex',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#282828',
  },
  tabContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  tabIconView: {  
    alignSelf: 'center',
  },
  iconButton: {
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',        
  },
  tabIconName: {
    color: '#7a7b7c',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(TabBar);