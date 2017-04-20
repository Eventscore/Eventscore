import React, { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import Graph from './Graph';
import LocationMap from './Map';

import NavBar from './NavBar';
import TabBar from './TabBar';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} = ReactNative;

class EventView extends Component {
  constructor() {
    super();
    this.state = {
    };
    
  }

  componentWillMount() {
  }

  goBackToEventList() {
    {Actions.event({type: ActionConst.BACK})}
  }

  render() {
    const start = new Date(this.props.eventsReducers.currEvent.start);
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
    } = this.props.eventsReducers.currEvent;

    return (
      <View style={styles.container}>
      <NavBar />
      <ScrollView style={styles.scroll}>
      <View style={styles.eventViewContainer}>
        <View style={styles.eventContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.weekday}>{day}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.artist}>
              {artists[0] ? artists[0].name : 'Rum Ham'}
            </Text>
            <Text style={styles.headline}>{name}</Text>
            <Text style={styles.timeVenue}>
              {timeValue} @ {venue ? venue : 'Wrigley Field'}
            </Text>
            <Text style={styles.location}>
              {city ? city : 'Chicago'}, 
              {state ? state : 'IL'}
            </Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>Score:</Text>
            <Text style={styles.scoreNumber}>
              {artists[0] && artists[0].spotify.popularity ? artists[0].spotify.popularity : 69}
            </Text>
          </View>
        </View>
        <LocationMap />
        { artists[0] ? 
          <Image
            style={{height: 50, width: 50}}
            source={{uri: artists[0].img }}
            // resizeMode='cover' // want to put this somewhere // possibly as background
          /> : null}
        <Graph/> 
      </View>
      </ScrollView>
      <TabBar /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    margin: 5
  },
  container: {
    flex: 1
  },
  eventViewContainer: {
    // backgroundColor: '#4682B4',
    // flex: 1,
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 22,
    paddingBottom: 50
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    // flex: 1,
    justifyContent: 'space-around',
    // height: 80,
    // borderBottomWidth: 0.3,
    padding: 3,
    margin: 1.5,
    // marginBottom: 3
  },
  dateBox:{
    display: 'flex',
    justifyContent: 'center',
    flex: 0.5
  },
  eventInfo:{
    display: 'flex',
    justifyContent: 'center',
    flex: 1
  },
  scoreBox:{
    display: 'flex',
    justifyContent: 'center',
    flex: 0.5
  },
  weekday:{
    textAlign: 'center',
    fontSize: 18
  },
  date:{
    textAlign: 'center',
  },
  artist:{
    textAlign: 'center',
  },
  headline:{
    textAlign: 'center',
    // flex: 1,
    fontSize: 18
  },
  timeVenue:{
    textAlign: 'center',
    fontSize: 12
  },
  location:{
    textAlign: 'center',
    fontSize: 12
  },
  score:{
    textAlign: 'center',
  },
  scoreNumber:{
    textAlign: 'center',
    fontSize: 18
  },
  scroll:{
    flex: 1
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventView;
export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers} }, mapDispatchToProps)(EventView);
