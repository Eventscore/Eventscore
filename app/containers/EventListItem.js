import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class EventListItem extends Component {
  constructor() {
    super();
    this.state = {
    };
    
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={{borderWidth: 0.5, margin: 0.5}}>
        <Text>{this.props.event.name}</Text>
        <Text>Artists: </Text>
        {this.props.event.artists.map((artist) => {
          return (<Text key={artist.name}>{artist.name}</Text>)
        })}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect((state) => { return {} }, mapDispatchToProps)(EventListItem);