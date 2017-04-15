import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import Graph from './Graph';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button
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
    {Actions.rootTabBar({type: ActionConst.BACK})}
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

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.goBackToEventList}>
            <Text style={styles.backButton}>Back To Events!</Text>
        </TouchableHighlight>
        <View style={styles.eventContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.weekday}>{day}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.artist}>{this.props.eventsReducers.currEvent.artists[0] ? this.props.eventsReducers.currEvent.artists[0].name : 'Rum Ham'}</Text>
            <Text style={styles.headline}>{this.props.eventsReducers.currEvent.name}</Text>
            <Text style={styles.timeVenue}>{timeValue} @ {this.props.eventsReducers.currEvent.venue ? this.props.eventsReducers.currEvent.venue : 'Wrigley Field'}</Text>
            <Text style={styles.location}>{this.props.eventsReducers.currEvent.city ? this.props.eventsReducers.currEvent.city : 'Chicago, IL'}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>Score:</Text>
            <Text style={styles.scoreNumber}>{this.props.eventsReducers.currEvent.score !== 0 ? this.props.eventsReducers.currEvent.score : Math.floor(Math.random() * 100)}</Text>
          </View>
        </View>
        <Graph/>  
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
  }
});

// const styles = StyleSheet.create({
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
// });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventView;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventView);