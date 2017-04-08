//events reducer
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedEvents = createReducer({}, {
  [types.SET_SEARCHED_EVENTS](state, action) {
    let newState = {};
    action.events.forEach( event => {
      newState[event.id] = event;
    });
    return newState;
  }
});

export const eventCount = createReducer(0, {
  [types.SET_SEARCHED_EVENTS](state, action){
    return action.events.length;
  },
  [types.ADD_EVENT](state, action){
    return ++state;
  },
  [types.REMOVE_EVENT](state, action){
    return --state;
  }
});