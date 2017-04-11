//login actions
import createReducer from '../lib/createReducer';
import Api from '../lib/api';
import * as types from '../actions/types';

// export function invokeLogin ({ username, password }){
//   const params = { username, password };
//   console.log('params: ', params);
//   Api.post('/auth/users/login', params).then(res =>
//     {
//       console.log(res);
//       return {
//         type: types.INVOKE_LOGIN,
//         status: 'success',
//         response: res,
//       }
//   }).catch( (err) => {
//     console.log(err);
//     return {
//       type: types.INVOKE_LOGIN,
//       status: 'error',
//       response: err
//     }
//   });
// };

export function invokeLogin({ username, password }) {
  return (dispatch, getState) => {
    const params = { username, password };
    return Api.post('/auth/users/login', params).then(res => {
      dispatch({
        type: types.INVOKE_LOGIN,
        status: 'success',
        response: res,
      });
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function addCount (count){
  return {
    type: types.ADD_COUNT,
    count
  }
}
