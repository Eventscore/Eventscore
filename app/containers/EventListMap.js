import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Actions, ActionConst } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / (height);// - 200); // 100 = 60 + 40 (height of nav and tab) // however like 500 really makes an impact
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class EventListMap extends Component {
  render() {
    const LATITUDE = this.props.eventsReducers.geolocation.coords.latitude;
    const LONGITUDE = this.props.eventsReducers.geolocation.coords.longitude;
    const TITLE = 'Beyonce';
    const LOCATION = 'Levi Stadium';
    let coordsArr = this.props.eventsReducers.events.map(function(event) {
      return {
        coords: {latitude: event.location.coordinates[1], longitude: event.location.coordinates[0]}, 
        title: event.name,
        location: event.venue,
        key: event.created
      };
    });
    return (
      <View style={styles.container}>
        <View style={styles.scrollview}>
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
                key={marker.key}
              />
            ))}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  scrollview: {
    alignItems: 'center',
    flex: 1,
    display: 'flex'
  },
  map: {
    width: width,
    height: height,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, eventsReducers}) => { return {routes, eventsReducers}; }, mapDispatchToProps)(EventListMap);