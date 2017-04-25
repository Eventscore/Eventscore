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
  ListView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FilterItemGenre from './FilterItemGenre'
import TabBar from './TabBar';
import Search from './Search'; //remove this later, only for testing

const { width , height } = Dimensions.get("window");
const background = require("../assets/image/login1_bg.png");
const popImg = require("../assets/image/genres/pop.png");
const rockImg = require("../assets/image/genres/rock.png");
const countryImg = require("../assets/image/genres/country.png");
const jazzImg = require("../assets/image/genres/jazz.png");
const electronicImg = require("../assets/image/genres/electronic.png");
const rapImg = require("../assets/image/genres/rap.png");

// const genreImages = require('../assets/image/Genres');

class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const genreList = [['pop', popImg], ['rap', rapImg], ['rock', rockImg], ['country', countryImg], ['jazz', jazzImg], ['electronic', electronicImg] ];
    this.state = {
      keyword: '',
      genreList: ds.cloneWithRows(genreList),    
    }
  }
  
  async fetchEventsByKeywordRedux(){
    let keyword = this.state.keyword || null;
    let genre = this.props.genre || null;
    let getLocation = await this.props.getLocation();
    this.getEvents(keyword, genre);
  }

  getEvents(...args){
    // this.props.fetchEventByKeyword(keyword, genre)});
    this.props.fetchEventByKeyword(
      keyword,
      genre,
      this.props.locationReducers.geolocation.coords.longitude,
      this.props.locationReducers.geolocation.coords.latitude
    ).then(() => {
      {Actions.event()}
    }).catch((error) => {
      console.log(error);
      //TODO: Include some sort of visual illustration that the call failed
    })    
  }

  render() {
    return (
      <View style={styles.container}> 
        <Search />
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.genreList}
          renderRow={ (genre) => <FilterItemGenre genre={genre} />}
        />
        <TabBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393a3d',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 12
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, locationReducers, eventReducers}) => { return {routes, loginReducers, locationReducers, eventReducers}}, mapDispatchToProps)(Home);