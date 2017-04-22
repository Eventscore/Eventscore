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

const defaultStyles = {
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputContainerLeftTop: {
    backgroundColor: '#000000',
    width: WINDOW.width,
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainerLeftBottom: {
    backgroundColor: '#000000',
    width: WINDOW.width * .9,
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
  },
  textInputContainerRightTop: {
    backgroundColor: '#000000',
    width: WINDOW.width * .1,
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainerRightBottom: {
    backgroundColor: '#000000',
    width: WINDOW.width * .1,
    height: 88,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputTop: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  textInputBottom: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  titleViewText: {
    marginTop: 25,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  powered: {},
  listView: {
    // flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};

//search starts as one empty field with instructions: search for events
//eventscore logo is above search bar in the middle

//when search bar is tapped, search bar transforms to two fields with search button

//search needs two fields: one for keywords and another for location
//keywords: default is blank
//location: default is current location
//when both are default, events of any type that are close to current location 
  //are passed to eventlist component to render

//onSubmit or onChange, values from both fields are sent to server endpoint

//need to re-use url builder function from Al's component

//need to have autocomplete or have a dropdown of list of cities, states in second field
//second field can be tapped to expand dropdown
class Search extends Component {
  constructor() {
    super();
  }

  render() {
    return (
    <View style={defaultStyles.searchContainer} >
      <View style={{flex: 1,flexDirection: 'column'}}>
        <View style={defaultStyles.textInputContainerLeftTop} >
            <Text style={defaultStyles.titleViewText}>EventScore</Text>
        </View>
        <View style={defaultStyles.textInputContainerLeftBottom} >
          <TextInput style={defaultStyles.textInputTop} placeholder="e.g Beyonce, The Weeknd, Bruno Mars" />
        </View>
        <View style={defaultStyles.textInputContainerLeftBottom} >
          <TextInput style={defaultStyles.textInputBottom} />
        </View>
      </View>
      <View style={{flex: 1,flexDirection: 'column',alignItems: 'flex-end'}}>
        <View style={defaultStyles.textInputContainerRightTop} >
        </View>
        <View style={defaultStyles.textInputContainerRightBottom} >
          <TouchableHighlight underlayColor = 'transparent'>
            <View>
              <Icon name="search" size = {20} color = "#FFFFFF" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(({routes, loginReducers, eventsReducers}) => { return {routes, loginReducers, eventsReducers}}, mapDispatchToProps)(Search);