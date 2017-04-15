import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state ={
      geolocation: '',
      genre: '',
      priceRange: '',
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({geolocation: position});
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  searchPressedRedux(){
    //TODO: Create a redux fetch function based on the genre, price range, and etc
  }
  
  render(){
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => this.searchPressedRedux()} style={styles.filterOption}>
          <Icon name='music' size={10} style={styles.filterIcon} />
          <Text style={styles.filterBy}> Hip hop </Text>
          <Icon name='angle-double-right' size={10} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.searchPressedRedux()} style={styles.filterOption}>
          <Icon name='music' size={10} style={styles.filterIcon} />
          <Text style={styles.filterBy}> R&B </Text>
          <Icon name='angle-double-right' size={10} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.searchPressedRedux()} style={styles.filterOption}>
          <Icon name='music' size={10} style={styles.filterIcon} />
          <Text style={styles.filterBy}> Pop </Text>
          <Icon name='angle-double-right' size={10} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.searchPressedRedux()} style={styles.filterOption}>
          <Icon name='music' size={10} style={styles.filterIcon} />
          <Text style={styles.filterBy}> Jazz </Text>
          <Icon name='angle-double-right' size={10} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.searchPressedRedux()} style={styles.filterOption}>
          <Icon name='music' size={10} style={styles.filterIcon} />
          <Text style={styles.filterBy}> Classical </Text>
          <Icon name='angle-double-right' size={10} style={styles.searchIcon} />
        </TouchableOpacity>                             
      </View>
    )
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    // flex: 1,
    display: 'flex',
    height: 100,
    width: 350,
    // padding: 5,
    position: 'relative',
    marginTop:5,
    borderBottomWidth: 1,
    flexDirection: 'column',
    // flexWrap: 'nowrap',
    backgroundColor: '#DCDCDC',
  },
  filterOption: {
    display: 'flex',
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    // position: 'absolute',
    // top: .10,
    // bottom: .90,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center', 
  },
  // filterOption:nth-child(n+3):nth-child(-n+7){

  // },
  filterIcon: {
    flex: 0.2,
    color: 'black',
    alignSelf: 'center',
  },
  searchIcon: {
    flex: 0.2,
    color: 'black',
    alignSelf: 'center',    
  },  
  filterBy: {
    flex: 0.6,
  }
});


function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, eventsReducers}) => { return {routes, eventsReducers}}, mapDispatchToProps)(Filter);