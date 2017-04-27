import * as types from '../actions/types';
import Api from '../lib/api';

// location action
export function setListType(bool) {
  return (dispatch, getState) => {
    if (bool !== undefined) {
      /* listType is available */
      dispatch({
        type: types.SET_LIST_TYPE,
        listType: bool
      });
    } else {
      console.log('no state available');
      /* listType IS NOT available */
      dispatch({
        type: types.SET_LIST_TYPE_FAILED,
        listType: false
      });
    }
  };
}