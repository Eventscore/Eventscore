//login actions
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export function invokeLogin ({ username, password }){
  return {
    type: types.INVOKE_LOGIN,
    username,
    password
  }
};

export function addCount (count){
  return {
    type: types.ADD_COUNT,
    count
  }
}
