import { Actions } from 'react-native-router-flux';

export default function invokeLoginReducer(state = {status: null, response: null}, action) {
  console.log('action: ', action);
  switch (action.type) {
    case 'INVOKE_LOGIN':
      return {
        status: action.status,
        response: action.response
      };
      break;
    // ...other actions
    default:
      return state;
  }
}
