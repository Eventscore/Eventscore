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

const serverDomain = 'http://localhost:1337/api/events';
const styles = StyleSheet.create({
  fetchEventsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      eventList: ds.cloneWithRows([]),
      loading: true
    };
  }

  getLocation() {
    // get locations
    this.setState({loading: true});
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log('position: ', position);
        // this.setState({geolocation: position});
        // once location is received then fetch nearby events
        this.props.fetchNearbyEvents(position.coords.longitude, position.coords.latitude)
        .then(() => {
          // then set eventlist state to fetched events and set loading state to false
          // datasource of list depends on eventlist state
          this.setState({
            eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
            loading: false
          });
        });
        // var initialPosition = JSON.stringify(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });
  }

  searchPressed() {
    this.getLocation();
  }

  componentWillMount() {
    this.getLocation();
  }

  componentDidMount() {
   // this.getLocation(); 
  }

  render() {
    if (this.state.loading) {
      return( <ActivityIndicator size='large' style={{height:80}} />)
    } else {
      return (
        <View>
        <TouchableHighlight style={{paddingTop: 22}} onPress={ () => this.searchPressed() }>
          <Text style={styles.fetchEventsText}>Fetch Events</Text>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(EventList);