// import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'gold',
    // justifyContent: 'center',
  }
});

class LocationMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Hi </Text>
      </View>
    );
  }
}

export default connect(({routes}) => ({routes}))(LocationMap);
