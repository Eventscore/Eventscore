import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Landing extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    const {routes} = this.context;
    console.log('this: ', this);
    return (
      <View style={styles.outerContainer}>
        <Text>
          { `This is the ${ this.props.title }` }
        </Text>
        <Text onPress={Actions.rootTabBar}>Home page</Text>
        <Text onPress={() => {Actions.login()}}>Login</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1
  }
})

export default connect(state => ({routes: state.routes}), null)(Landing);

