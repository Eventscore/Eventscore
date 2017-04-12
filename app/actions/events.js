//event actions
import createReducer from '../lib/createReducer';
import fetch from 'isomorphic-fetch';
// import * as types from '../actions/types';

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

// example
// export function fetchRecipes(ingredients) {
//   return (dispatch, getState) => {
//     const params = [
//       `i=${encodeURIComponent(ingredients)}`,
//       'p=1'
//     ].join('&')
//     return Api.get(`/api/?${params}`).then(resp => {
//       dispatch(setSearchedRecipes({recipes: resp}));
//     }).catch( (ex) => {
//       console.log(ex);
//     });
//   }
// }

// example
export function addCount(count){
  return {
    type: types.ADD_COUNT,
    count
  }
};