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
    return (
      <TouchableHighlight onPress={() => this.pressListItem()}>
      <View style={styles.container}>
        <View style={styles.dateBox}>
          <Text style={styles.weekday}>Wed</Text>
          <Text style={styles.date}>Nov 12</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.artist}>{this.props.event.artists[0].name}</Text>
          <Text style={styles.headline}>{this.props.event.name}</Text>
          <Text style={styles.timeVenue}>8:00PM @ Wrigley Field</Text>
          <Text style={styles.location}>Chicago, IL</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.score}>Score:</Text>
          <Text style={styles.scoreNumber}>94</Text>
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