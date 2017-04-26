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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const WINDOW = Dimensions.get('window');
const deviceWidth = WINDOW.width;
const deviceHeight = WINDOW.height;


class BasicNav extends Component {
  constructor() {
    super();
    this.state ={
      mainNav: true,
    }
  }

  render() {

    return (
      <View style={styles.searchContainer} >
          <View style={styles.navContainer} >
            <View style={styles.navLeft}>
              <TouchableOpacity style={styles.navLeftIconButton} onPress={() => {Actions.pop()}}>
                <Icon name='arrow-left' style={styles.navLeftIconView} size={15} color="#dbdfe0" resizeMode="contain" />  
              </TouchableOpacity>             
            </View>
              <Text style={styles.titleViewText}>EventScore</Text>
            <View style={styles.navRight}>          
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
  navContainer: {
    display: 'flex',
    backgroundColor: '#000000',
    width: WINDOW.width,
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navLeft: {
    flex: .5,
  },
  navLeftIconView: {
    paddingLeft: 15,
  },
  navLeftIconButton: {
    backgroundColor: 'transparent',
    marginTop: 25,     
  },  
  titleViewText: {
    flex: 1,
    marginTop: 25,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  navRight: {
    flex: .5,
  },
  navRightIconButton: {
    backgroundColor: 'transparent',  
  },
  navRightIconView: {
    paddingRight: 15, 
  }
};

function mapStateToProps(state) {
  return {
    routes: state.routes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicNav);
