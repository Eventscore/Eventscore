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

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
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

class EventListMapWorking extends Component {
  state = {
    listSwitch: true
  };
  render() {
    return (
      <View style={{marginTop: 20}}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.switch}>List 
          <Switch
            onValueChange={(value) => {
              this.setState({listSwitch: value});
              Actions.rootTabBar();
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
      </View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // marginTop: 20,
    alignItems: 'center',
    // flex: 1,
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
    paddingVertical: 40,
  },
  map: {
    width: width,
    height: height,
  },
  switch: {
    fontSize: 20,
    marginTop: 5,
  }
});

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }

// export default connect(({routes}) => ({routes}), mapDispatchToProps)(EventListMap);

export default connect(({routes}) => ({routes}))(EventListMapWorking);
