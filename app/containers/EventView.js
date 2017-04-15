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
        <Button
        onPress={this.goBackToEventList}
        title="Back"
        color="#841584"
        />
        <Text style={{textAlign: 'center'}}>{this.props.eventsReducers.currEvent._id}</Text>
        <View style={styles.eventContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.weekday}>Wed</Text>
            <Text style={styles.date}>Nov 12</Text>
          </View>
          <View>
            <Text style={styles.artist}>{this.props.eventsReducers.currEvent.artists[0].name}</Text>
            <Text style={styles.headline}>{this.props.eventsReducers.currEvent.name}</Text>
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
        <Graph/>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: 22
  },
  eventContainer: {
    borderWidth: 0,
    margin: 0.5,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#4682B4',
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