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

export function changeCurrEvent(event) {
  return {
    type: types.CHANGE_CURR_EVENT,
    currEvent: event
  }
}

// does location need to be in the state store?
export function getLocation(longitude, latitude) {
  return {

  }
}

/*
//Al's code
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
