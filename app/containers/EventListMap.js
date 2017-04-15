import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import Graph from './Graph';
// import MapView from 'react-native-maps';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button
} = ReactNative;

class EventListMap extends Component {
  constructor() {
    super();
    this.state = {
    };
    
  }

  componentWillMount() {
  }

  goBackToEventList() {
    {Actions.rootTabBar({type: ActionConst.BACK})}
  }

  render() {
      //  <MapView
      //   initialRegion={{
      //     latitude: 37.78825,
      //     longitude: -122.4324,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   }}
      // />
    return (
      <View style={{paddingTop: 22}}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListMap;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventListMap);