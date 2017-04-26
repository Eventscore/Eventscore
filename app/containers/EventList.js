import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EventListItem from './EventListItem';
import EventListMap from './EventListMap';
// import NavBar from './NavBar';
import TabBar from './TabBar';
import Search from './Search'; //remove this later, only for testing
import FlipCard from 'react-native-flip-card';
const background = require("../assets/image/SeaBlue.jpg");

class EventList extends Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';
  constructor() {
    super();
    this.state = {
      listSwitch: false,
      isRefreshing: false,
      loaded: 0,
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
    ).catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (!this.props.eventsReducers.events) {
      console.log('COMPONENT DID MOUNT FOR EVENTLIST')
      this.getNearbyEvents();
    }
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let list = null;
    if (this.state.listSwitch) {
      list = <EventListMap />;
    } else {
      list = 
        <View style={styles.eventContainer}>
          <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.searchPressed()}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }>
          <ListView
            dataSource={ds.cloneWithRows(this.props.eventsReducers.events ? this.props.eventsReducers.events : [])}
            renderRow={(event) => <EventListItem key={event._id} event={event} />}
          />
          </ScrollView>
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
          {list}
            <TouchableHighlight style={styles.floatButtonContainer} onPress={ (value) => { this.setState({listSwitch: !this.state.listSwitch}); }} value={this.state.listSwitch}>
              <Text style={{fontSize: 15, color: '#FFF'}}>{this.state.listSwitch === false ? 'Map' : 'List'}</Text>
            </TouchableHighlight>
        </View>;
    } else {
      listPageRender = 
        <View style={styles.eventContainer}>
        </View>;
    }

    return (
      <View style={{flex: 1}}>
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
        <View style={{flex: -1, zIndex: 1}}>
          <Search />
        </View>
        <View style={{flex: 8, zIndex: 0}}>
          {listPageRender}
        </View>
        <View style={{flex: 1, zIndex: 2}}>
          <TabBar />
        </View>
        </Image>
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
    flex: 1,
    backgroundColor: 'transparent',
  },
  bg: {
    // paddingTop: 30,
    width: null,
    height: null
  },    
  eventContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    display: 'flex',
  },
  switch: {
    marginTop: 5,
    fontSize: 20,
    color: '#FFF'
  },
  switchContainer: {
    alignItems: 'center'
  },
  floatButtonContainer: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
};

function mapStateToProps(state) {
  return {
    locationReducers: state.locationReducers,
    eventsReducers: state.eventsReducers,
    // routes: state.routes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);