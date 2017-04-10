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

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
    
  }

  getEvents() {
    return fetch('http://localhost:1337/api/events')
    .then((response) => { return response.json(); })
    .then((responseData) => {
      console.log('responseData: ', responseData);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(responseData)});
      return responseJson;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentWillMount() {
    this.getEvents();
  }

  render() {
    return (
      <ListView
        style={{flex: 1, paddingTop: 22}}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventListItem key={event._id} event={event}/>}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default EventList;
// export default connect((state) => { return {} }, mapDispatchToProps)(EventList);