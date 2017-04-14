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
      <TouchableHighlight onPress={() => this.pressListItem()}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={{color: 'white'}}>{this.props.event._id}</Text>
          <Text>{this.props.event.name}</Text>
        </View>
        <View style={styles.item}>
          <Text>{this.props.event.artists[0].name}</Text>
          <Text>{this.props.event.name}</Text>
        </View>
        <View style={styles.item}>
          <Text>Artists: </Text>
          {this.props.event.artists.map((artist) => {
            return (<Text key={artist.name}>{artist.name}</Text>)
          })}
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    margin: 0.5,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#4682B4',
    flex: 1,
    justifyContent: 'center'
  },
  item:{
    borderWidth: 0,
    flexDirection: 'column',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// export default EventListItem;
export default connect(({routes, loginReducers, eventsReducers, addCountExample}) => { return {routes, loginReducers, eventsReducers, addCountExample} }, mapDispatchToProps)(EventListItem);