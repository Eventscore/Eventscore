import React , { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EventListItem from './EventListItem';

const serverDomain = 'http://localhost:1337/api/events';

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      geolocation: ''
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({geolocation: position});
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });
  }

        //Testing purposes only
        componentWillMount() {
          this.getLocation();
          this.getEvents();
        }

        //Testing Only
        sendLocation() {
          fetch(serverDomain, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: this.state.geolocation
          })
        }

        //Testing for Dummy Data
        getEvents() {
          return fetch(serverDomain + '/exampledata')
          .then((response) => { return response.json(); })
          .then((responseData) => {
            console.log('responseData: ', responseData);
            this.setState({dataSource: this.state.dataSource.cloneWithRows(responseData)});
          })
          .catch((err) => {
            console.log(err);
          })
        }

  searchPressed() {
    // console.log('props: ', this.props);
    this.props.fetchNearbyEvents(this.state.geolocation.coords.longitude, this.state.geolocation.coords.latitude);
  }


  componentDidMount() {
  }

  render() {
    console.log(this.state.geolocation);
    return (
      <View>
      <TouchableHighlight style={{paddingTop: 22}} onPress={ () => this.searchPressed() }>
        <Text>Fetch Events</Text>
      </TouchableHighlight>
      <ListView
        // style={{flex: 1, paddingTop: 22}}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventListItem key={event._id} event={event} />}
      />
      </View>
    )
    // return (
    //   <ListView
    //     style={{flex: 1, paddingTop: 22}}
    //     dataSource={this.state.dataSource}
    //     renderRow={(event) => <EventListItem key={event._id} event={event}/>}
    //   />
    // );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(EventList);