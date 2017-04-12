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
            <Text style={styles.selectionText} onPress={() => {Actions.login()}}>Login</Text>
            <Text style={styles.selectionText} onPress={() => {Actions.signup()}}>Sign Up</Text>
          </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  backgroundImage:{
    flex:1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  headline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'gray'
  },
  backdropView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between', 
    backgroundColor: 'rgba(0,0,0,0)',
  },
  selectionText: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',  
    color: 'white',
  },
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

