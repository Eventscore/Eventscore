//login actions
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export function invokeLogin ({ username, password }){
  console.log('hello');
  return {
    type: 'INVOKE_LOGIN',
    username,
    password
  }
};

export function addCount (){
  return {
    type: 'ADD_COUNT',
  }
}