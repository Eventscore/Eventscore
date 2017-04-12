//event actions
import createReducer from '../lib/createReducer';
import fetch from 'isomorphic-fetch';
import * as types from '../actions/types';

export function getLocation(){
  
}

export function fetchNearbyEvents(long, lat) {
  return (dispatch, getState) => {
    const params = [
      `longitude/${encodeURIComponent(long)}`,
      `latitude/${encodeURIComponent(lat)}`
    ];
    return Api.get('/'+`${params.join('/')}`).then(res => {
      dispatch({
        type: types.RECEIVE_EVENTS,
        long: long,
        lat: lat,
        events: res.events,
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