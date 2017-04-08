import React , { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
const {
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} = ReactNative;


class Home extends Component {
  searchPress() {
    this.props.fetchEvents('hiphop,rap,dank');
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <View>
          <TouchableHighlight onPress={ () => this.searchPressed() }>
            <Text> Fetch Events </Text>
          </TouchableHighlight>
        </View>
        <ScrollView>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchedEvents: state.searchedEvents
  };
}

export default connect(mapStateToProps)(Home);
