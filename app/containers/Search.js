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

class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      genreInput: '',
      searching: false,
    };
  }
  
  //TODO: search logic is not built out
  searchPressed() {
    console.log('clicked');
  }
  
  render(){
    return (
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput}
          returnKeyType='search'
          placeholder='Write a placeholder here'
          onChangeText={(genreInput) => this.setState({genreInput})}
          value={this.state.genreInput}
        />
        <TouchableOpacity onPress={() => this.searchPressed()} style={styles.searchButton}>
          <Text> Fetch Events </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 0.7,
  },
  searchButton: {
    flex: 0.3,
  },  
});


function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample}}, mapDispatchToProps)(Search);
