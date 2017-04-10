import React , { Component } from 'react';
import ReactNative from 'react-native';

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
      <View>
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

export default EventListItem;
// export default connect((state) => { return {} }, mapDispatchToProps)(EventListItem);