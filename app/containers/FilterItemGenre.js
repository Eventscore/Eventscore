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
    let keyword = this.props.keyword || null;
    let genre = this.props.genre || null;
    let getLocation = await this.props.getLocation();
    this.getEvents(keyword, genre);
  },

  getEvents(...args){
    // this.props.fetchEventByKeyword(keyword, genre)});
    this.props.fetchNearbyEvents(
      this.props.locationReducers.geolocation.coords.longitude,
      this.props.locationReducers.geolocation.coords.latitude
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
        <TouchableOpacity style={styles.filterOptionGenre} onPress={() => this.fetchEventsByGenreRedux()} value={this.props.genre}>
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
    // display: 'flex',
    // flex: 1,
    // margin: 5,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0,0,0,.6)',
    marginBottom: 25
  },
  genrePic: {
    width: 150,
    height: 150, 
  },
  genreTextTitle: {
    color: '#FFF',
    fontSize: 24,
    // fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    position: 'absolute',
    // justifySelf: 'center'
    // left: '50%',
    top: '50%', // isn't the best way because it's not centered
    // transform: 'translate(-50%, -50%)'
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, locationReducers}) => { return {routes, loginReducers, eventsReducers, locationReducers}}, mapDispatchToProps)(FilterItemGenre);