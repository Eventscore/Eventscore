import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions } from 'react-native-router-flux';
import BasicNav from './BasicNav';

import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class PopMap extends Component {

  render() {
    const event = this.props.eventsReducers.currEvent;
    const LATITUDE = event.location.coordinates[1];
    const LONGITUDE = event.location.coordinates[0];
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    let coords = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    const TITLE = event.artists[0] ? event.artists[0].name : '';
    const DESCRIPTION = event.venue;

    return (
      <View style={styles.container}>
        <View style={{flex: -1, zIndex: 1}}>      
          <BasicNav />
        </View>
        <View style={styles.eventBasicContainer} >
          <MapView
            style={styles.map}
            provider={this.props.provider}
            // scrollEnabled={false}
            // zoomEnabled={false}
            // pitchEnabled={false}
            // rotateEnabled={false}
            initialRegion={coords}
          >
            <MapView.Marker
              title={TITLE}
              description={DESCRIPTION}
              coordinate={coords}
              image={require('../assets/image/musicNote1.png')}
              // not doing anything... trying to get the label to be always displayed...
              // https://github.com/airbnb/react-native-maps look at the marker API
            />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
  },
  eventBasicContainer: {
    display: 'flex',
    // flex: 1,
  },
  map: {
    width: width,
    height: height,
    // marginBottom: 50
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, eventsReducers, listTypeReducers}) => { return {routes, eventsReducers, listTypeReducers} }, mapDispatchToProps)(PopMap);