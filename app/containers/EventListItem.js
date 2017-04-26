import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from './NavBar';
import TabBar from './TabBar';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const background = require("../assets/image/login1_bg.png");

class EventListItem extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
      loaded: 0,

    };
  }

  pressListItem() {
    {Actions.eventview()};
    this.props.changeCurrEvent(this.props.event);
  }

  componentWillMount() {
  }

  render() {
    const start = new Date(this.props.event.start);
    const startArray = start.toString() === 'Invalid Date' ? [] : start.toString().split(' '); 
    const day = startArray[0] || 'TBD';
    const date = startArray.slice(1, 3).join(' ') || 'TBD';
    
    let timeString = startArray[4] || ''; // convert to array
    let time = timeString.split(':');
    // fetch
    let hours = Number(time[0]);
    let minutes = Number(time[1]);

    // calculate
    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours === 0) {
      timeValue= "12";
    }
     
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? "PM" : "AM";  // get AM/PM

    const {
      artists,
      name,
      venue,
      city,
      state
    } = this.props.event;

    return (
      <TouchableHighlight onPress={() => this.pressListItem()}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          { artists[0] ? 
            <Image
              style={styles.image}
              source={{uri: artists[0].img }}
              // resizeMode='cover' // want to put this somewhere // possibly as background
            /> : 
            <Image
              style={styles.image}
              source={background}
              // resizeMode='cover' // want to put this somewhere // possibly as background
            />
          }
          <View style={styles.headlineTitleContainer}>
            <Text style={styles.headlineTitle}>{name}</Text>
            <Text style={styles.headlineVenue}>{timeValue} @ {venue ? venue : 'Undefined'}</Text>
          </View>
        <View style={styles.eventInfoBox}>
          <View style={styles.dateBox}>
            <Icon name='calendar-o' size={20} color="#7a7b7c" resizeMode="contain" />
            <Text style={styles.date}>{day}{', '}{date}</Text>
          </View>
          <View style={styles.locationBox}>
            <Icon name='map-marker' size={20} color="#7a7b7c" resizeMode="contain" />
            <Text style={styles.location}>
              {city ? city : 'N/A'}, {state ? state : 'N/A'}
            </Text>          
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>Score:</Text>
            <Text style={styles.scoreNumber}>
              {artists[0] && artists[0].spotify.popularity ? artists[0].spotify.popularity : 69}
            </Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableHighlight>
    );
          // {this.props.event.artists.map((artist) => {
          //   return (<Text key={artist.name}>{artist.name}</Text>)
          // })}
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3,
  },
  imageBox: {
    display: 'flex',
    alignItems: 'stretch',
    // alignContent: 'flex-end'
  },
  image: {
    flex: 1,
    height: 150,
    resizeMode: 'cover'
  },
  eventInfoBox: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    justifyContent: 'space-around',
    padding: 3,
    margin: 1.5,
  },
  headlineTitleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.6)',    
  },
  headlineTitle: {
    textAlign: 'left',
    color: '#FFF',
    fontSize: 16,
    paddingLeft: 5,
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    top: '55%'
  },
  headlineVenue: {
    textAlign: 'left',
    color: '#FFF5',
    fontSize: 14,
    paddingLeft: 5,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '65%'
  },
  headline:{
    textAlign: 'center',
    fontSize: 22,
  },  
  dateBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  date: {
    fontSize: 13,
    color: '#7a7b7c',
    alignSelf: 'center',
    // textAlign: 'center',
  },
  locationBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  location: {
    fontSize: 13,
    color: '#7a7b7c',
    alignSelf: 'center',
  },
  eventInfo:{
    display: 'flex',
    justifyContent: 'center',
    flex: 1
  },
  scoreBox:{
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: 5
  },
  score:{
    fontSize: 13,
    alignSelf: 'center',    
    textAlign: 'center',
    color: '#7a7b7c',
  },
  scoreNumber:{
    fontSize: 18,
    color: '#7a7b7c',
    alignSelf: 'center',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers} }, mapDispatchToProps)(EventListItem);