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

const defaultStyles = {
  searchContainer: {
    flex: -1,
    flexDirection: 'row',
  },
<<<<<<< HEAD
  topBarContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',  
  },
  topBarLeft: {
    flex: 1,
    backgroundColor: '#000000',
=======
  textInputContainerLeftTop: {
    backgroundColor: '#282828',
>>>>>>> Search function partially complete.
    width: WINDOW.width,
    height: 50,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'flex-start',
  },
<<<<<<< HEAD
  topBarRight: {
    flex: 1,
    backgroundColor: '#000000',
    width: WINDOW.width,
    height: 50,
=======
  textInputContainerLeftBottom: {
    backgroundColor: '#282828',
    width: WINDOW.width * .9,
    height: 44,
>>>>>>> Search function partially complete.
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'flex-end',
  },
<<<<<<< HEAD
  topBarMiddle: {
    flex: 1,
    backgroundColor: '#000000',
    width: WINDOW.width,
    height: 50,
=======
  textInputContainerRightTop: {
    backgroundColor: '#282828',
    width: WINDOW.width * .1,
    height: 44,
>>>>>>> Search function partially complete.
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
<<<<<<< HEAD
  textInputContainer: {
    backgroundColor: '#000000',
    width: WINDOW.width,
    height: 44,
=======
  textInputContainerRightBottom: {
    backgroundColor: '#282828',
    width: WINDOW.width * .1,
    height: 88,
>>>>>>> Search function partially complete.
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
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
    color: '#1faadb',
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
};

class Search extends Component {
  constructor() {
    super();
    this.state ={
      mainNav: true,
      keywords: '',
    }
    this.submitSearch = this.submitSearch.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  async getNearbyEvents() {
    let getLocation = await this.props.getLocation();
    console.log('COORDS', this.props.locationReducers.geolocation.coords);
    this.setState({coords : this.props.locationReducers.geolocation.coords})
  }

  submitSearch() {
    //this.state.keywords or ''
    //this.state.details.geometry.location.lng or lat
    //or this.state.coords.longitude or latitude (this choice is for current location)
    console.log('Searching...', this.state)
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
    this.setState({'keywords': ''});
  }

  componentDidMount() {
    //needs to set current location as default value for bottom search bar
    this.getNearbyEvents()
    console.log('COMPONENT MOUNTED STATE', this);
  }


  render() {
    let searchInputShow = null;
    if(this.state.keywords) {
      searchInputShow = <GooglePlacesAutocomplete
                          enablePoweredByContainer={false}
                          placeholder="Location"
                          minLength={2}
                          autoFocus={false}
                          fetchDetails={true}
                          query={{
                            key: 'AIzaSyDAXlRh07LCOjC8nMSPNTJcXOPBXG91liE',
                            language: 'en',
                            types: '(cities)',
                          }}
                          styles={{
                            textInputContainer: defaultStyles.textInputContainer,
                            textInput: defaultStyles.textInputBottom,
                            listView: {
                              flex: 1,
                              height: deviceHeight,
                              width: deviceWidth,
                              backgroundColor: '#FFFFFF',
                              paddingBottom: 90,
                            },
                          }}
                          nearbyPlacesAPI={'GooglePlacesSearch'}
                          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                        >
                        </GooglePlacesAutocomplete>
    }

    return (
      <View style={defaultStyles.searchContainer} >
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={defaultStyles.topBarContainer}>
            <View style={defaultStyles.topBarLeft}>
            {this.state.keywords.length > 0 && 
              <TouchableOpacity onPress={this.clearText}>
                <Text style={{color: '#FFF', marginTop: 25, marginLeft: 15}}>Cancel</Text>
              </TouchableOpacity>}
            </View>
            <View style={defaultStyles.topBarMiddle} >
                <Text style={defaultStyles.titleViewText}>EventScore</Text>
            </View>
            <View style={defaultStyles.topBarRight}>
            {this.state.keywords.length > 0 && 
              <TouchableOpacity onPress={this.submitSearch}>
                <Text style={{color: '#FFF', marginTop: 25, marginRight: 15}}>Search</Text>
              </TouchableOpacity>}          
            </View>            
          </View>
          <View style={defaultStyles.textInputContainer} >
            <TextInput ref={component => this._textInput = component} style={defaultStyles.textInputTop} placeholder='e.g Beyonce, The Weeknd, Bruno Mars' value={this.keywords} onChangeText={(keywords) => this.setState({keywords})} />
          </View>
          {searchInputShow}
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    locationReducers: state.locationReducers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
