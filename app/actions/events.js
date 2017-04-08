//Event Actions
import * as types from './types';
import Api from '../lib/api';

export function fetchEvents(genres) {
  return (dispatch, getState) => {
    //make async call to webservice here
    const params = [
      `genres=${encodeURIComponent(genres)}`,
      'fillIngredients=false',
      'limitLicense=false',
      'number=20',
      'ranking=1',
    ].join('&');
    return Api.get(`/recipes/findByIngredients?${params}`).then( res => {
      dispatch(setSearchedEvents({ events: res }));
    }).catch( err => {
      console.log(err);
    }
  };
}

export function setSearchedEvents( { events } ) {
  // the syntax used in the parameter is the same thing as args.events
  return {
    type: types.SET_SEARCHED_EVENTS,
    events
  };
}

export function addEvent() {
  return {
    type: types.ADD_EVENT,
  }
}