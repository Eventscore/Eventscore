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
import NavBar from './NavBar';
import TabBar from './TabBar';

class EventList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      eventList: ds.cloneWithRows([]),
      loading: true,
      cannotGetLocation: false,
      listSwitch: false
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
    });
  }

  componentWillMount() {
    this.getEvents();
  }

  componentDidMount() {
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
            // dataSource={this.props.eventsReducers.events}
            renderRow={(event) => <EventListItem key={event._id} event={event} />}
          />
        </View>;
    }

    let listPageRender = null;
    if (this.state.loading) {
      console.log('loading');
      listPageRender = 
        <View style={styles.eventContainer}>
          <ActivityIndicator size='large' style={{height: 80}} />
        </View>;
    } else if (this.state.cannotGetLocation) { // if cannot get user geolocation
      console.log('cant get user geolocation');
      listPageRender = 
        <View style={styles.eventContainer}>
          <Text style={{textAlign: 'center'}}>Error, please try again</Text>
        </View>;
    } else {
      console.log('else');
      listPageRender = 
        <View style={styles.eventContainer}>
          <View style={styles.switchContainer}>
            <Text style={styles.switch}>
              List 
              <Switch
                onValueChange={(value) => {
                  this.setState({listSwitch: value});
                  // Actions.event();  // should render correctly
                }}
                value={this.state.listSwitch}
              />
              Map
            </Text>
          </View>
          {list}
        </View>;
    }

    return (
      <View style={styles.container}>
        <NavBar />
        {listPageRender}
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
    // alignItems: 'center', // should center things but doesnt???? // probably should make a new view 
    // paddingTop: 20,
  },
  switch: {
    marginTop: 5,
    fontSize: 20,
  },
  switchContainer: {
    // display: 'flex',
    // flex: 1,
    alignItems: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(EventList);