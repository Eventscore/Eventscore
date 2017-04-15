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
        <View>
          <Text style={styles.artist}>{this.props.event.artists[0].name}</Text>
          <Text style={styles.headline}>{this.props.event.name}</Text>
          <View style={styles.timeVenue}>
            <Text>8:00PM @ Wrigley Field</Text>
          </View>
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
    borderWidth: 0,
    margin: 0.5,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#4682B4',
    flex: 1,
    justifyContent: 'space-around',
    height: 75
  },
  dateBox:{
    display: 'flex',
    justifyContent: 'center',
  },
  timeVenue:{
    display: 'flex',
    flexDirection: 'row',
  },
  scoreBox:{
    display: 'flex',
    justifyContent: 'center',
  },
  weekday:{
    textAlign: 'center',
    fontSize: 20
  },
  date:{
    textAlign: 'center',
  },
  artist:{
    textAlign: 'center',
  },
  headline:{
    textAlign: 'center',
    fontSize: 20
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
    fontSize: 20
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventListItem);