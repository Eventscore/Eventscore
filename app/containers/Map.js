import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';



  // initialRegion={{
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // }}


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const TITLE = 'Beyonce';
const DESCRIPTION = 'Levi Stadium';

let coords = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

class LocationMap extends Component {
  render() {
    return (
      <View style={styles.container}>
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
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 50,
    alignItems: 'center',
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
    height: 150,
  }
});

export default connect(({routes}) => ({routes}))(LocationMap);
