import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EventListItem from './EventListItem';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

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
        // console.log('position: ', position);
        this.setState({geolocation: position});
        var initialPosition = JSON.stringify(position);
        // console.log('init position: ', initialPosition);
        // console.log('state.geolocation after finding: ', this.state.geolocation);
        // this.sendLocation();
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });
  }

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

  componentWillMount() {
    this.getLocation();
    this.getEvents();
  }

  componentDidMount() {
  }

  render() {
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventList;
export default connect((state) => { return {} }, mapDispatchToProps)(EventList);