import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EventListItem from './EventListItem';
import EventListMap from './EventListMap';
// import NavBar from './NavBar';
import TabBar from './TabBar';
import Search from './Search'; //remove this later, only for testing

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      eventList: ds.cloneWithRows([]),
      listSwitch: false
    };
  }

  searchPressed() {
    this.getNearbyEvents();
  }

  async getNearbyEvents() {
    let getLocation = await this.props.getLocation();
    this.props.fetchNearbyEvents(
      this.props.locationReducers.geolocation.coords.longitude,
      this.props.locationReducers.geolocation.coords.latitude
    ).then(() => {
      this.setState({
        eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (!this.props.eventsReducers.events) {
      this.getNearbyEvents();
    } else {
      this.setState({
          eventList: this.state.eventList.cloneWithRows(this.props.eventsReducers.events),
      });
    }
  }

  render() {
    let list = null;
    if (this.state.listSwitch) {
      list = <EventListMap />;
    } else {
      list = 
        <View style={styles.eventContainer}>
          <TouchableHighlight onPress={ () => this.searchPressed() }>
            <Text style={styles.fetchEventsText}>Check Nearby Events!</Text>
          </TouchableHighlight>
          <ListView
            dataSource={this.state.eventList}
            renderRow={(event) => <EventListItem key={event._id} event={event} />}
          />
        </View>;
    }

    let listPageRender = null;
    if (this.props.eventsReducers.loadingEvents) {
      listPageRender = 
        <View style={styles.eventContainer}>
          <ActivityIndicator size='large' style={{height: 80}} />
        </View>;
    } else if (this.props.eventsReducers.cannotGetEvents) { // if cannot get user geolocation
      listPageRender = 
        <View style={styles.eventContainer}>
          <TouchableHighlight onPress={ () => this.searchPressed() }>
            <Text style={styles.fetchEventsText}>Check Nearby Events!</Text>
          </TouchableHighlight>
          <Text style={{textAlign: 'center'}}>Error, please try again</Text>
        </View>;
    } else if (this.props.eventsReducers.events) {
      listPageRender = 
        <View style={styles.eventContainer}>
          <View style={styles.switchContainer}>
            <Text style={styles.switch}>
              List 
              <Switch
                onValueChange={(value) => {
                  this.setState({listSwitch: value});
                }}
                value={this.state.listSwitch}
              />
              Map
            </Text>
          </View>
          {list}
        </View>;
    } else {
      listPageRender = 
        <View style={styles.eventContainer}>
        </View>;
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: -1, zIndex: 1}}>
          <Search />
        </View>
        <View style={{flex: 8, zIndex: 0}}>
          {listPageRender}
        </View>
        <View style={{flex: 1, zIndex: 2}}>
          <TabBar />
        </View>
      </View>
    );
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
    flex: 1
  },
  eventContainer: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
  },
  switch: {
    marginTop: 5,
    fontSize: 20,
  },
  switchContainer: {
    alignItems: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers, locationReducers}) => { return {routes, loginReducers, eventsReducers, locationReducers}}, mapDispatchToProps)(EventList);