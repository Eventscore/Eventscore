import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimerMixin from 'react-timer-mixin';

const background = require("../assets/image/SeaBlue.jpg");

const { width , height } = Dimensions.get("window");

const Landing = React.createClass({
  mixins: [TimerMixin],
  componentDidMount: function() {
    this.setTimeout(
      () => {
        {Actions.login()}
      }, 1500);
  },
  render() {
    const {routes} = this.context;    
    return (
      <View style={styles.container}>      
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerLandTitle}>
              <Text style={styles.titleViewText}>Eventscore</Text>
              <Text style={styles.subtitleText}>Scores for concert tickets</Text>
            </View>
          </View>
        </Image>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },  
  headerContainer: {
    flex: 1,
  },
  headerLandTitle: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitleText: {
    fontSize: 20,
    color: '#fff',
  }, 
  background: {
    paddingTop: 30,
    width: null,
    height: null
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "transparent",
    // paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    borderColor: "#CCC",
    // marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  }
})

export default connect(state => ({routes: state.routes}), null)(Landing);

