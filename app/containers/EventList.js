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
import NavBar from './NavBar';
import TabBar from './TabBar';

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

  searchPressed() {
    this.setState({loading: true});
    this.props.getLocation();
    this.getEvents();
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
    let listRender = null;
    if (this.state.loading) {
      console.log('loading');
      listRender = 
        <View style={styles.eventContainer}>
          <ActivityIndicator size='large' style={{height:80}} />
        </View>;
    } else if (this.state.cannotGetLocation) { // if cannot get user geolocation
      console.log('cant get user geolocation');
      listRender = 
        <View style={styles.eventContainer}>
          <Text style={{textAlign: 'center'}}>Error, please try again</Text>
        </View>;
    } else {
      console.log('else');
      listRender = 
        <View style={styles.eventContainer}>
          <TouchableHighlight onPress={ () => this.searchPressed() }>
          <Text style={styles.fetchEventsText}>Check Nearby Events!</Text>
          </TouchableHighlight>
          <ListView
            dataSource={this.state.eventList}
            // dataSource={this.props.eventsReducers.events}
            renderRow={(event) => <EventListItem key={event._id} event={event} />}
          />
        </View>;
    }

    return (
      <View style={styles.container}>
        <NavBar />
        {listRender}
        <TabBar />
      </View>
    );

    // OLD RENDER // TO BE DELETED AFTER CODE REVIEW
    // if (this.state.loading) {
    //   console.log('loading');
    //   return (
    //     <View style={styles.container}>
    //       <NavBar />
    //       <View style={styles.eventContainer}>
    //         <ActivityIndicator size='large' style={{height:80}} />
    //       </View>
    //       <TabBar />
    //     </View>
    //   )
    // } else if (this.state.cannotGetLocation) { // if cannot get user geolocation
    //   console.log('cant get user geolocation');
    //   return (
    //     <View style={styles.container}>
    //       <NavBar />
    //       <View style={styles.eventContainer}>
    //         <Text style={{textAlign: 'center'}}>Error, please try again</Text>
    //       </View>
    //       <TabBar />
    //     </View>
    //   )
    // } else {
    //   console.log('else');
    //   return (
    //     <View style={styles.container}>
    //       <NavBar />
    //       <View style={styles.eventContainer}>
    //         <TouchableHighlight onPress={ () => this.searchPressed() }>
    //           <Text style={styles.fetchEventsText}>Check Nearby Events!</Text>
    //         </TouchableHighlight>
    //         <ListView
    //           dataSource={this.state.eventList}
    //           // dataSource={this.props.eventsReducers.events}
    //           renderRow={(event) => <EventListItem key={event._id} event={event} />}
    //         />
    //       </View>
    //       <TabBar />
    //     </View>
    //   )
    // }

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
    // backgroundColor: '#4682B4',
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    // paddingTop: 20,
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(EventList);