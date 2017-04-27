import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  ScrollView,
  View,
  ListView,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity, 
  StyleSheet,
  Platform,
  ActivityIndicator,
  PixelRatio,
  Dimensions,  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WINDOW = Dimensions.get('window');
const deviceWidth = WINDOW.width;
const deviceHeight = WINDOW.height;

class BasicNav extends Component {
  constructor() {
    super();
    this.state ={
    }
  }

  render() {

    const {
      artists,
      name,
      venue,
      city,
      state
    } = this.props.eventsReducers.currEvent;

    return (
      <View style={styles.searchContainer} >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.topBarContainer}>
            <View style={styles.topBarLeft}>
              <TouchableOpacity style={{marginTop: 25}} onPress={() => {Actions.pop()}}>
                <Icon name='chevron-left' style={{marginLeft: 15}} size={15} color="#dbdfe0" resizeMode="contain" />  
              </TouchableOpacity> 
            </View>
            <View style={styles.topBarMiddle} >
                <Text style={styles.titleViewText}>Eventscore</Text>
            </View>
            <View style={styles.topBarRight}>
            </View>            
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  searchContainer: {
    flex: -1,
  },
  topBarContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',  
  },
  topBarLeft: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.2)',   
    width: WINDOW.width,
    height: 50,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  topBarRight: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,.2)',
    width: WINDOW.width,
    height: 50,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
    alignItems: 'flex-end',
  },
  topBarMiddle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    width: WINDOW.width,
    height: 50,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  titleViewText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, eventsReducers}) => { return {routes, eventsReducers} }, mapDispatchToProps)(BasicNav);

