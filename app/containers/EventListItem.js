import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';

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

  pressListItem() {
    {Actions.eventview({type: ActionConst.PUSH})};
    this.props.changeCurrEvent(this.props.event);
  }

  componentWillMount() {
  }

  render() {
    return (
      <TouchableHighlight style={{borderWidth: 0, margin: 0.5}} onPress={() => this.pressListItem()}>
      <View>
        <Text>{this.props.event._id}</Text>
        <Text>{this.props.event.name}</Text>
        <Text>Artists: </Text>
        {this.props.event.artists.map((artist) => {
          return (<Text key={artist.name}>{artist.name}</Text>)
        })}
      </View>
      </TouchableHighlight>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventListItem);