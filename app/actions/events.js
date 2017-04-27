//event actions
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import Api from '../lib/api';

export function searchEvents(long, lat, keywords) {
  return (dispatch, getState) => {

    const params = [
      `longitude/${encodeURIComponent(long)}`,
      `latitude/${encodeURIComponent(lat)}`
    ];
    if (keywords.length > 0) {
      const query = keywords.join('-');
      params.push(`?keywords=${encodeURIComponent(query)}`);
      console.log('PARAMS', params);
    }
    dispatch({
      type: types.REQUEST_EVENTS,
      loadingEvents: true
    })
    return Api.get(`/api/events/search/${params.join('/')}`).then(res => {
      dispatch({
        type: types.RECEIVE_EVENTS,
        long: long,
        lat: lat,
        events: res,
        receivedAt: Date.now(),
        res: res,
        cannotGetEvents: false,
        loadingEvents: false
      });
    }).catch( (ex) => {
      dispatch({
        type: types.RECEIVE_EVENTS_FAILED,
        long: long,
        lat: lat,
        events: null,
        receivedAt: Date.now(),        
        res: ex,
        cannotGetEvents: true,
        loadingEvents: false
      });
    });
  }
}

export function fetchNearbyEvents(long, lat) {
  return (dispatch, getState) => {
    const params = [
      `longitude/${encodeURIComponent(long)}`,
      `latitude/${encodeURIComponent(lat)}`
    ];
    dispatch({
      type: types.REQUEST_EVENTS,
      loadingEvents: true
    })
    return Api.get(`/api/events/${params.join('/')}`).then(res => {
      dispatch({
        type: types.RECEIVE_EVENTS,
        long: long,
        lat: lat,
        events: res,
        receivedAt: Date.now(),
        res: res,
        cannotGetEvents: false,
        loadingEvents: false
      });
    }).catch( (ex) => {
      dispatch({
        type: types.RECEIVE_EVENTS_FAILED,
        long: long,
        lat: lat,
        events: null,
        receivedAt: Date.now(),        
        res: ex,
        cannotGetEvents: true,
        loadingEvents: false
      });
    });
  }
}

export function fetchEventByGenre(lon, lat, genre) {
  return (dispatch, getState) => {
    const params = [
    `longitude/${encodeURIComponent(long)}`,
    `latitude/${encodeURIComponent(lat)}`,
    `genre/${encodeURIComponent(genre)}`,
    ];
    return Api.get(`/api/events/genres/${params.join('/')}`).then(res => {
      dispatch({
        type: types.REQUEST_EVENTS_FILTER,
        keyword: keyword,
        genre: genre,
        receivedAt: Date.now(),
        events: res,
        status: 'success',
        res: res
      });
    }).catch( (ex) => {
      dispatch({
        type: types.REQUEST_EVENTS_FILTER_FAILED,
        keyword: keyword,
        genre: genre,
        receivedAt: Date.now(),
        events: res,
        status: 'error',
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
