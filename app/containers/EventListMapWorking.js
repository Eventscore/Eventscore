import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Actions, ActionConst } from 'react-native-router-flux';

import NavBar from './NavBar';
import TabBar from './TabBar';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / (height);// - 200); // 100 = 60 + 40 (height of nav and tab) // however like 500 really makes an impact
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

      // this.props.eventsReducers.geolocation.coords.longitude,
      // this.props.eventsReducers.geolocation.coords.latitude

class EventListMapWorking extends Component {
  state = {
    listSwitch: true
  };
  render() {
    const LATITUDE = this.props.eventsReducers.geolocation.coords.latitude;
    const LONGITUDE = this.props.eventsReducers.geolocation.coords.longitude;
    const TITLE = 'Beyonce';
    const LOCATION = 'Levi Stadium';
    let coords = {
      latitude: LATITUDE - .005,
      longitude: LONGITUDE - .005,
    };
    let coords2 = {
      latitude: LATITUDE + .005,
      longitude: LONGITUDE + .005,
    };
    let coordsArr = [{coords: coords, title: TITLE, location: LOCATION}, {coords: coords2, title: TITLE + '1', location: LOCATION}];
    return (
      <View style={styles.container}>
        <NavBar />
        <View style={styles.scrollview}>
          <Text style={styles.switch}>
            List 
            <Switch
              onValueChange={(value) => {
                this.setState({listSwitch: value});
                Actions.event();
              }}
              value={this.state.listSwitch}
            />
            Map
          </Text>
          <MapView
            style={styles.map}

            provider={this.props.provider}

            // scrollEnabled={false}
            // zoomEnabled={false}
            // pitchEnabled={false}
            // rotateEnabled={false}

            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
          >
            {coordsArr.map(marker => (
              <MapView.Marker
                title={marker.title}
                description={marker.location}
                coordinate={marker.coords}
                key={marker.title}
              />
            ))}
          </MapView>
        </View>
        <TabBar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // marginTop: 20,
    // alignItems: 'center',
    flex: 1,
    // backgroundColor: 'gold',
    // justifyContent: 'center',
  },
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   // justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  scrollview: {
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 40,
    flex: 1,
    display: 'flex'
  },
  map: {
    width: width,
    height: height,
  },
  switch: {
    marginTop: 5,
    fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default connect(({routes}) => ({routes}), mapDispatchToProps)(EventListMap);
export default connect(({routes, eventsReducers}) => { return {routes, eventsReducers} }, mapDispatchToProps)(EventListMapWorking);
// export default connect(({routes}) => ({routes}))(EventListMapWorking);
