//login reducer

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const invokeLogin = createReducer({}, {
  [types.INVOKE_LOGIN](state, action){
    state['hello'] = 'world';
    return state;
  }
});

export const addCount = createReducer(0, {
  [types.ADD_COUNT](state, action){
    return state+1;
  }
})
