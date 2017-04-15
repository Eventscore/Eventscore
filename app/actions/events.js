//event actions
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import Api from '../lib/api';

export function fetchNearbyEvents(long, lat) {
  return (dispatch, getState) => {
    const params = [
      `longitude/${encodeURIComponent(long)}`,
      `latitude/${encodeURIComponent(lat)}`
    ];
    return Api.get(`/api/events/${params.join('/')}`).then(res => {
      dispatch({
        type: types.RECEIVE_EVENTS,
        long: long,
        lat: lat,
        events: res,
        receivedAt: Date.now(),
        res: res
      });
    }).catch( (ex) => {
      dispatch({
        type: types.RECEIVE_EVENTS_FAILED,
        long: long,
        lat: lat,
        events: null,
        receivedAt: Date.now(),        
        res: ex
      });
    });
  }
}

export function fetchEventByKeyword(keyword, location, priceRange, genre) {
  return (dispatch, getState) => {
    const params = [
    `keyword/${encodeuRIComponent(keyword)}`,
    `location/${encodeuRIComponent(location)}`,
    `priceRange/${encodeuRIComponent(priceRange)}`,
    `genre/${encodeuRIComponent(genre)}`,
    ];
    return Api.get(`/api/events/${params.join('/')}`).then(res => {
      dispatch({
        type: types.REQUEST_EVENTS_FILTER,
        keyword: keyword,
        location: location,
        priceRange: priceRange,
        genre: genre,
        receivedAt: Date.now(),
        events: res,
        res: res
      });
    }).catch( (ex) => {
      dispatch({
        type: types.REQUEST_EVENTS_FILTER_FAILED,
        keyword: keyword,
        location: location,
        priceRange: priceRange,
        genre: genre,
        receivedAt: Date.now(),
        events: res,
        res: ex        
      })
    })
  }
}

export function changeCurrEvent(event) {
  return {
    type: types.CHANGE_CURR_EVENT,
    currEvent: event
  }
}

// location action
export function getLocation() {
  // console.log('hit get location');
  return (dispatch, getState) => {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log('position: ', position);
        dispatch({
          type: types.GET_LOCATION,
          geolocation: position
        })
      }, (error) => {
        alert(JSON.stringify(error));
        dispatch({
          type: types.GET_LOCATION_FAILED,
          geolocation: null
        })
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    });
  }
}

/*
//Al's awesome code
const serverDomain = 'http://localhost:1337/api/events';

export function requestEvents(long, lat){
  return {
    type: 'REQUEST_EVENTS',
    long,
    lat
  }
};

export function receiveEvents(long, lat, json){
  // console.log('json: ', json);
  return {
    type: 'RECEIVE_EVENTS',
    long,
    lat,
    events: json.events,
    // events: json.data.children.map(child => child.data), // unsure if this is necessary
    receivedAt: Date.now()
  }
};

export function fetchNearbyEvents(long, lat) {
  return (dispatch) => {
    // dispatch(requestEvents(long, lat));
    const params = [
      `longitude/${encodeURIComponent(long)}`,
      `latitude/${encodeURIComponent(lat)}`
    ];
    
    console.log(`${serverDomain}/${params.join('/')}`);
    return fetch(`${serverDomain}/${params.join('/')}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveEvents(long, lat, json)))

  }
};
*/
