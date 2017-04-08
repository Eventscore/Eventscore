import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

class Landing extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    const {routes} = this.context;
    //const goToPageTwo = () => Actions.pageTwo({text: 'Helo world'});
    return (
      <View style={styles.outerContainer}>
        <Text>

        </Text>
        <Text onPress={Actions.rootNavBar}>This is PageOne!</Text>
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

export default connect(({routes}) => ({routes}))(Landing);