//login actions
import createReducer from '../lib/createReducer';
import Api from '../lib/api';
import * as types from '../actions/types';

export function invokeLogin({ username, password }) {
  return (dispatch, getState) => {
    const params = { username, password };
    return Api.post('/auth/users/login', params).then(res => {
      console.log(res);
      dispatch({
        type: types.INVOKE_LOGIN,
        username: params.username,
        isLoggingIn: true,
        isLoggedIn: false,
        token: '',
        userId: res._id,
        error: false,      
        status: 'success',
        response: res,
      });
    }).catch( (ex) => {
      console.log(ex);
      dispatch({
        type: types.INVOKE_FAILED_LOGIN,
        username: params.username,
        isLoggingIn: false,
        isLoggedIn: false,
        token: '',
        userId: ex._id,
        error: false,      
        status: 'failed',
        response: ex,
      });
    });
  }
}

export function invokeSignup({ name, username, password, email }) {
  return (dispatch, getState) => {
    const params = { name, username, password, email };
    return Api.post('/auth/users/signup', params).then(res => {
      console.log(res);
      dispatch({
        type: types.INVOKE_SIGNUP,
        name: params.name,
        username: params.username,
        password: params.password,
        email: params.email,
        isSigningIn: true,
        isSignedIn: false,
        token: '',
        userId: res._id,
        error: false,      
        status: 'success',
        response: res,
      });
    }).catch( (ex) => {
      console.log(ex);
      dispatch({
        type: types.INVOKE_FAILED_SIGNUP,
        name: params.name,
        username: params.username,
        password: params.password,
        email: params.email,
        isSigningIn: false,
        isSignedIn: false,
        token: '',
        userId: ex._id,
        error: false,      
        status: 'failed',
        response: ex,
      });
    });
  }
}

export function addCount (count){
  return {
    type: types.ADD_COUNT,
    count
  }
}
