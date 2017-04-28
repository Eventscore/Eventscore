import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Graph from './Graph';
import LocationMap from './Map';
import BasicNav from './BasicNav';
import TabBar from './TabBar';
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
  Linking,
} from 'react-native';

const background = require("../assets/image/SeaBlue.jpg");

class EventView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      eventInfo: ds.cloneWithRows([]),  
    };
    
  }

  handlePress() {
    const uri = this.props.eventsReducers.currEvent.sgticketsurl;
    Linking.canOpenURL(uri).then(supported => {
      if (supported) {
        Linking.openURL(uri);
      } else {
        console.log('Don\'t know how to open URI: ' + uri);
      }
    });
  }

  handlePressMap() {
    Actions.popmap();
  }

  render() {
    const start = new Date(this.props.eventsReducers.currEvent.start);
    const startArray = start.toString() === 'Invalid Date' ? [] : start.toString().split(' '); 
    const day = startArray[0] || 'TBD';
    const date = startArray.slice(1, 3).join(' ') || 'TBD';
    
    let timeString = startArray[4] || ''; // convert to array
    let time = timeString.split(':');
    // fetch
    let hours = Number(time[0]);
    let minutes = Number(time[1]);

    // calculate
    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours;
    } else if (hours > 12) {
      timeValue = '' + (hours - 12);
    } else if (hours === 0) {
      timeValue = '12';
    }
     
    timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
    timeValue += (hours >= 12) ? 'PM' : 'AM';  // get AM/PM

    const {
      artists,
      name,
      venue,
      city,
      state
    } = this.props.eventsReducers.currEvent;


    let _round = (num) => Math.round(100 * num) / 100; 
    const event = this.props.eventsReducers.currEvent;
    let data = [];
    // GET FOR ALL ARTISTS BUT NEED TO REMOVE DUPLICATES!
    if (event.artists[0] !== undefined) {
      let weight = 1;
      event.artists.forEach(function(artist, index) {
        data.push({'weight': weight, 'name': artist.name + '\'s Spotify Ranking', 'score': artist.spotify.popularity, 'type': 'spotifyArtist'});
        data.push({'weight': weight, 'name': artist.name + '\'s SeatGeek Score', 'score': _round(artist.score * 100), 'type': 'seatGeekArtist'});
        if (index === 0) {
          weight /= event.artists.length;
        }
      });
    }
    data.push({'weight': 0.5, 'name': event.venue + '\'s Venue Score', 'score': _round(event.venueScore * 100), 'type': 'venue'});
    data.push({'weight': 1.5, 'name': 'SeatGeek Event Score', 'score': _round(event.sgscore * 100)});
    if (event.watsonScore) {
      data.push({'weight': 2, 'name': 'Social Perception', 'score': _round(event.watsonScore.score * 100), 'type': 'socialPerception'});
    }

    const eventScore = 
      Math.round(
      data.reduce(function(a, b) {
        return a + (b.score * b.weight); 
      }, 0) / 
      data.reduce(function(a, b) { 
        return a + b.weight; 
      }, 0)
      );

    const colors = [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];

    return (
      <View style={styles.container}>
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={{flex: -1, zIndex: 1}}>      
            <BasicNav />
          </View>
          <ScrollView style={styles.eventBasicContainer} bounces={false}>
            <View style={{flex: 2, zIndex: 0}}>
              <View style={styles.imageBox}>
              { artists[0] ? 
                <Image
                  style={styles.image}
                  source={{uri: artists[0].img }}
                /> : 
                <Image
                  style={styles.image}
                  source={background}
                />
              }
                <View style={styles.headlineTitleContainer}>
                  <Text style={styles.headlineTitle}>{name}</Text>
                  <Text style={styles.headlineVenue}>{timeValue} @ {venue ? venue : 'Undefined'}</Text>
                  <TouchableHighlight 
                    style={styles.floatButtonContainer} 
                    onPress={ () => { this.refs.scrollView.scrollTo(_scrollToBottomY) }} 
                  >
                    <Icon name='angle-double-down' size={25} color='#7a7b7c' resizeMode='contain' />
                  </TouchableHighlight>
                </View>
              </View>
            <View style={styles.metricContainer}>
              <ScrollView 
                ref='scrollView'
                scrollEnabled = {false}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  _scrollToBottomY = contentHeight;
                }}>
                <Graph
                  data={data}
                  colors={colors}
                  eventScore={eventScore}
                />
              </ScrollView>               
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.buyButton}>
                <TouchableOpacity
                  onPress={(e) => this.handlePress(e)}>
                    <Text style={styles.buyText}>Buy Tickets</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={(e) => this.handlePressMap(e)}>
                <LocationMap />
                <View style={styles.addressButton}>
                  <Text style={styles.addressText}>{venue ? venue : 'N/A'}, {city ? city : 'N/A'}, {state ? state : 'N/A'}
                  </Text>
                  <Icon name='chevron-right' size={15} color='#7a7b7c' resizeMode='contain' />
                </View>
              </TouchableOpacity>


            </View>
            </View>
          </ScrollView>
        </Image>
      </View>
    );
  }
}

/*
  <View style={styles.badgeList}>
    <View style={styles.badge}>
      <Icon name='spotify' size={30} color='green' resizeMode='contain' />
      <Text>{this.props.eventsReducers.currEvent.artists[0].spotify.popularity}</Text>
    </View>
    <View style={styles.badge}>
    <Icon name='users' size={30} color='lime' resizeMode='contain' />
      <Text>{this.props.eventsReducers.currEvent.artists[0].spotify.followers}</Text>
    </View>
    <View style={styles.badge}>
      <Icon name='globe' size={30} color='skyblue' resizeMode='contain' />
      <Text>{Math.round(this.props.eventsReducers.currEvent.venueScore * 100)}</Text>
    </View>
    <View style={styles.badge}>
      <Text>{city}</Text>
    </View>
  </View>
*/

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'column',
  },
  bg: {
    width: null,
    height: null
  },    
  imageBox: {
    display: 'flex',
    alignItems: 'stretch',
  },
  eventBasicContainer: {
    display: 'flex',
  },
  image: {
    height: 300,
    width: null,
    resizeMode: 'cover',
  },
  headlineTitleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.3)',    
  },
  headlineTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 30,
    position: 'absolute',
    top: '75%'
  },
  headlineVenue: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFF9',
    fontSize: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '85%'
  },
  metricContainer: {
    flex: 1,
    flexDirection: 'row',
    },
  floatButtonContainer: {
    backgroundColor: 'rgba(0,0,0,.2)',
    borderColor: '#fff5',
    borderWidth: 1,
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#FFF9",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  bottomContainer: {
    // flex: -1,
    display: 'flex',
  },
  buyButton: {
    // position: 'absolute',
    zIndex: 2,
    top: '15%',
    padding: 15,
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    margin: 25,
    borderRadius: 50,
    alignItems: 'center',
  },
  buyText: {
    color: '#FFF',
    fontSize: 16
  },
  addressButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1,
    borderBottomWidth: 1,    
    backgroundColor: '#EEE',
  },
  addressText: {
    color: '#7a7b7c',
  },



  badgeList: {
    flex: .5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    alignItems: 'center'
  },
  badge: {
    display: 'flex',
    height: 60,
    width: 80,
    alignItems: 'center',
    padding: 5,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    eventsReducers: state.eventsReducers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventView);