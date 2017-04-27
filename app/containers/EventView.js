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
} from 'react-native';

const background = require("../assets/image/SeaBlue.jpg");

class EventView extends Component {
  constructor() {
    super();
    this.state = {
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
        <ScrollView style={styles.eventBasicContainer}>
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
          <ScrollView 
            style={styles.metricContainer}
            ref='scrollView'
            scrollEnabled = {false}
            onContentSizeChange={(contentWidth, contentHeight) => {
              _scrollToBottomY = contentHeight;
            }}>
            <View style={styles.eventInformation}>
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
            </View>            
            <Graph
              data={data}
              colors={colors}
              eventScore={eventScore}
            /> 
          </ScrollView>

          <View>
            <TouchableOpacity
              onPress={(e) => this.handlePress(e)}>
              <View style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Tickets</Text>
              </View>
            </TouchableOpacity>            
            <TouchableOpacity
              onPress={(e) => this.handlePressMap(e)}>
              <LocationMap />
              <View style={styles.addressButton}>
                <Text style={styles.text}>{venue ? venue : 'N/A'}, {city ? city : 'N/A'}, {state ? state : 'N/A'}
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
    flexDirection: 'column',
    height: 230,
    width: null
  },
  eventInformation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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




  badgeList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  badge: {
    display: 'flex',
    height: 60,
    width: 80,
    alignItems: 'center',
    padding: 5  
  },
  addressButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1,
    borderBottomWidth: 1,    
  },
  text: {
    color: '#7a7b7c',
  },
  buyButton: {
    padding: 10,
    backgroundColor: 'dimgray',
    margin: 20
  },
  buyText: {
    color: '#FFF',
    fontSize: 16
  },


  eventViewContainer: {
    // backgroundColor: '#4682B4',
    // flex: 1,
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 22,
    paddingBottom: 50
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    // flex: 1,
    justifyContent: 'space-around',
    // height: 80,
    // borderBottomWidth: 0.3,
    padding: 3,
    margin: 1.5,
    // marginBottom: 3
  },
  dateBox: {
    display: 'flex',
    justifyContent: 'center',
    flex: 0.5
  },
  eventInfo: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1
  },
  scoreBox: {
    display: 'flex',
    justifyContent: 'center',
    flex: 0.5
  },
  weekday: {
    textAlign: 'center',
    fontSize: 18
  },
  date: {
    textAlign: 'center',
  },
  artist: {
    textAlign: 'center',
  },
  headline: {
    textAlign: 'center',
    // flex: 1,
    fontSize: 18
  },
  timeVenue: {
    textAlign: 'center',
    fontSize: 12
  },
  location: {
    textAlign: 'center',
    fontSize: 12
  },
  score: {
    textAlign: 'center',
  },
  scoreNumber: {
    textAlign: 'center',
    fontSize: 18
  },
  scroll: {
    flex: 1
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