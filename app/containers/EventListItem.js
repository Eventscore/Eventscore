import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class EventListItem extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  pressListItem() {
    {Actions.eventview({type: ActionConst.PUSH})};
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

    return (
      <TouchableHighlight onPress={() => this.pressListItem()}>
      <View style={styles.container}>
        <View style={styles.dateBox}>
          <Text style={styles.weekday}>{day}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.artist}>
            {this.props.event.artists[0] ? this.props.event.artists[0].name : 'Rum Ham'}
          </Text>
          <Text style={styles.headline}>{this.props.event.name}</Text>
          <Text style={styles.timeVenue}>
            {timeValue} @ {this.props.event.venue ? this.props.event.venue : 'Wrigley Field'}
          </Text>
          <Text style={styles.location}>
            {this.props.event.city ? this.props.event.city : 'Chicago'}, {this.props.event.state ? this.props.event.state : 'IL'}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.score}>Score:</Text>
          <Text style={styles.scoreNumber}>
            {this.props.event.artists[0] && this.props.event.artists[0].spotify.popularity ? this.props.event.artists[0].spotify.popularity : 69}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    flex: 1,
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventListItem);