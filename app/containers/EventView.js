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
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.goBackToEventList}>
            <Text style={styles.backButton}>Back To Events!</Text>
        </TouchableHighlight>
        <View style={styles.eventContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.weekday}>Wed</Text>
            <Text style={styles.date}>Nov 12</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.artist}>{this.props.eventsReducers.currEvent.artists[0].name}</Text>
            <Text style={styles.headline}>{this.props.eventsReducers.currEvent.name}</Text>
            <Text style={styles.timeVenue}>8:00PM @ Wrigley Field</Text>
            <Text style={styles.location}>Chicago, IL</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>Score:</Text>
            <Text style={styles.scoreNumber}>94</Text>
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