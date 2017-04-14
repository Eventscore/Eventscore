import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Landing extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    const {routes} = this.context;
    console.log('this: ', this);
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../assets/image/concert_crowd.jpg')} />
        <Text style={styles.headline}>Eventscore</Text>
        <View style={styles.backdropView}>
          <TouchableOpacity onPress={() => {Actions.login()}} style={styles.button}>
              <Icon name='chevron-left' size={15} style={styles.chevronLeft} />
              <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
          <View style={{'flex': 1}}></View>
          <TouchableOpacity onPress={() => {Actions.rootTabBar()}} style={styles.button}>
              <Icon name='chevron-right' size={15} style={styles.chevronLeft} />          
              <Text style={styles.buttonText}> Home </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.signup()}} style={styles.button}>
              <Icon name='chevron-right' size={15} style={styles.chevronLeft} />          
              <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
        </View>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',    
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  backgroundImage:{
    flex:1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  headline: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'gray'
  },
  backdropView: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'space-around',
    marginBottom: 150,
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black', 
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  chevronLeft: {
    color: 'white',
    alignSelf: 'center',
  },
  chevronRight: {
    color: 'white',
    alignSelf: 'center',
  }
})

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1
//   }
// })

export default connect(state => ({routes: state.routes}), null)(Landing);

