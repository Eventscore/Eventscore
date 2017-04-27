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
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FilterItemGenre from './FilterItemGenre'
import TabBar from './TabBar';
import Search from './Search'; //remove this later, only for testing
import EventListItem from './EventListItem';

const background = require("../assets/image/SeaBlue.jpg");
const { width , height } = Dimensions.get("window");
const popImg = require("../assets/image/genres/pop_img.jpg");
const rockImg = require("../assets/image/genres/rock_img.jpg");
const countryImg = require("../assets/image/genres/country_img.jpg");
const jazzImg = require("../assets/image/genres/jazz_img.jpg");
const electronicImg = require("../assets/image/genres/electronic_img.jpg");
const rapImg = require("../assets/image/genres/rap_img.jpeg");
StatusBar.setBarStyle('light-content', true);

class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    const genreList = [['pop', popImg], ['rap', rapImg], ['rock', rockImg], ['country', countryImg], ['jazz', jazzImg], ['electronic', electronicImg] ];
    this.state = {
      keyword: '',
      genreList: ds.cloneWithRows(genreList),
      eventList: ds.cloneWithRows([]),  
    }
  }
  
  async fetchEventsByKeywordRedux(){
    let keyword = this.state.keyword || null;
    let genre = this.props.genre || null;
    let getLocation = await this.props.getLocation();
    this.getEvents(keyword, genre);
  }

  getEvents(...args){
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

  // async getNearbyEvents() {
  //   let getLocation = await this.props.getLocation();
  //   this.props.fetchNearbyEvents(
  //     this.props.locationReducers.geolocation.coords.longitude,
  //     this.props.locationReducers.geolocation.coords.latitude
  //   ).then(() => {
  //     this.setState({
  //       eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // componentDidMount() {
  //   this.getNearbyEvents();
  // }

  // <Text style={styles.titleText}>Hot Events Near You</Text>
  //   <ListView
  //     dataSource={this.state.eventList}
  //     initialListSize={2}
  //     pageSize={2}
  //     renderRow={(event) => <EventListItem key={event._id} event={event} />}
  //   />

  render() {
    return (
      <View style={styles.container}> 
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
        <View style={{flex: -1, zIndex: 1}}> 
          <Search />
        </View>
        <View style={{flex: 8, zIndex: 0}}>
          <ScrollView style={styles.title}>
            <Text style={styles.titleText}>Search by Genres</Text>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.genreList}
            renderRow={ (genre) => <FilterItemGenre genre={genre} />}
          />
        </ScrollView>
        </View>
        <View style={{flex: 1, zIndex: 2}}>
          <TabBar />
        </View> 
        </Image>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: 'flex',
    // backgroundColor: '#050505',
    backgroundColor: 'transparent',
  },
  bg: {
    // paddingTop: 30,
    width: null,
    height: null
  },  
  title: {
    // display: 'flex',
    flex: 8, 
    zIndex: 0
  },
  titleText: {
    color: "#FFF",
    fontSize: 24,
    alignSelf: 'center',
    margin: 10
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, locationReducers}) => { return {routes, loginReducers, eventsReducers, locationReducers}}, mapDispatchToProps)(Home);