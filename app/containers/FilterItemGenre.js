import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
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
  ListView,
} from 'react-native';

const { width , height } = Dimensions.get("window");
const background = require("../assets/image/login1_bg.png");

var FilterItemGenre = React.createClass({
  async fetchEventsByGenreRedux(){
    let genre = this.props.genre[0] || null;
    let getLocation = await this.props.getLocation();
    console.log('FILTERITEMGENRE GENRE', genre);
    this.getEvents(genre);
  },

  getEvents(...args){
    // this.props.fetchEventByKeyword(keyword, genre)});
    this.props.fetchEventByGenre(
      this.props.locationReducers.geolocation.coords.longitude,
      this.props.locationReducers.geolocation.coords.latitude,
      this.props.genre[0]
    ).then(() => {
      {Actions.event()}
    }).catch((error) => {
      console.log(error);
      //TODO: Include some sort of visual illustration that the call failed
    })    
  },

  render(){
    return(
      <View style={styles.filterOptionGenre}>
        <TouchableOpacity style={styles.genrePic} onPress={() => this.fetchEventsByGenreRedux()} value={this.props.genre}>
          <Image source={this.props.genre[1]} 
          style={styles.genrePic} 
          resizeMode='cover'>
          </Image>
          <Text style={styles.genreTextTitle}>{this.props.genre[0].toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  filterOptionGenre: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
  genrePic: {
    width: 150,
    height: 150,
  },
  genreTextTitle: {
    color: '#FFF',
    fontSize: 24,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    position: 'absolute',
    top: '50%',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, locationReducers}) => { return {routes, loginReducers, eventsReducers, locationReducers}}, mapDispatchToProps)(FilterItemGenre);