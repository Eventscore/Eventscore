import React , { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EventListItem from './EventListItem';
import EventListMap from './EventListMap';

const serverDomain = 'http://localhost:1337/api/events';

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      eventList: ds.cloneWithRows([]),
      loading: true,
      cannotGetLocation: false
    };
  }

  // geolocation with standard react state
  // getLocation() {
  //   // get locations
  //   this.setState({loading: true});
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       // console.log('position: ', position);
  //       // this.setState({geolocation: position});
  //       // once location is received then fetch nearby events
  //       this.props.fetchNearbyEvents(position.coords.longitude, position.coords.latitude)
  //       .then(() => {
  //         // then set eventlist state to fetched events and set loading state to false
  //         // datasource of list depends on eventlist state
  //         this.setState({
  //           eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
  //           loading: false
  //         });
  //       });
  //       // var initialPosition = JSON.stringify(position);
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //   )
  //   // this.watchID = navigator.geolocation.watchPosition((position) => {
  //   //   var lastPosition = JSON.stringify(position);
  //   //   this.setState({lastPosition});
  //   // });
  // }

  searchPressed() {
    this.setState({loading: true});
    this.props.getLocation();
    this.getEvents();
    // this.props.getLocation().then(() => {
    //   this.getEvents();
    // });
    // .then(() => {
    //   this.props.getLocation();
    // })
  }

  getEvents() {
    this.setState({cannotGetLocation: false});
    this.props.fetchNearbyEvents(
      this.props.eventsReducers.geolocation.coords.longitude,
      this.props.eventsReducers.geolocation.coords.latitude
    ).then(() => {
      this.setState({
        eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
        loading: false
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        loading: false,
        cannotGetLocation: true
        // eventList: this.state.eventList.cloneWithRows([{name: 'Rum Ham'}]),
      });
    })
  }

  componentWillMount() {
    this.getEvents();
  }

  componentDidMount() {
  }

  render() {
    if (this.state.loading) {
      return(<ActivityIndicator size='large' style={{height:80}} />)
    } else if (this.state.cannotGetLocation) { // if cannot get user geolocation
      return (
        <View style={{justifyContent: 'center', paddingTop: 22}}>
          <Text>Error, please try again</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
        <TouchableHighlight onPress={ () => this.searchPressed() }>
          <Text style={styles.fetchEventsText}>Check Nearby Events!</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.eventList}
          // dataSource={this.props.eventsReducers.events}
          renderRow={(event) => <EventListItem key={event._id} event={event} />}
        />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  fetchEventsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    margin: 5
  },
  container: {
    // alignItems: 'center',
    // backgroundColor: '#4682B4',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
    paddingBottom: 50
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(EventList);