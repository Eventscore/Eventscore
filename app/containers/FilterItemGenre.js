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
      this.props.eventsReducers.geolocation.coords.longitude,
      this.props.eventsReducers.geolocation.coords.latitude
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
          <Image source={background} 
          style={styles.filterOptionGenre} 
          resizeMode="cover">
            <View style={styles.genreTextContainer}>
              <Text style={styles.genreTextTitle}>{this.props.genre}</Text>
            </View>
          </Image>     
        </TouchableOpacity>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  filterOptionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterOptionGenre: {
    // display: 'flex',
    // flex: 1,
    // margin: 5,
    width: 125,
    height: 125,
  },
  genreTextContainer: {
    // display: 'flex',
    // justifyContent: 'center'
  },
  genreTextTitle: {
    color: '#FFF',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(FilterItemGenre);