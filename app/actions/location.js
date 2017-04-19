import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import Api from '../lib/api';

// location action
export function getLocation() {
  console.log('LOCATION ACTION HERE!!!!!!');
  return (dispatch, getState) => {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
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