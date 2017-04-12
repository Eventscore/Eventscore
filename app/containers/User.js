import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class User extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          { `This is the ${ this.props.title }` }
        </Text>
        <Text style={styles.welcome}
          onPress={() => Actions.pop()}>
          Close User
        </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'gold',
    // justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

// export default connect(mapStateToProps, mapDispatchToProps)(User);

export default connect(({routes}) => ({routes}))(User);
