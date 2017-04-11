import { Actions } from 'react-native-router-flux';

const initialState = {
  username: '',
  isLoggingIn: false,
  isLoggedIn: false,
  token: '',
  userId: 0,
  error: null,
  status: null,
  response: null
};

export default function invokeLoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'INVOKE_LOGIN':
      return {
        username: action.username,
        isLoggingIn: false,
        isLoggedIn: true,
        token: '',
        userId: action.userId,
        error: action.error,
        status: action.status,
        response: action.response,
      };
      break;
    case 'INVOKE_FAILED_LOGIN':
      return {
        username: action.username,
        isLoggingIn: false,
        isLoggedIn: false,
        token: '',
        userId: action.userId,
        error: action.error,
        status: action.status,
        response: action.response,
      };  
      break;
    // ...other actions
    default:
      return state;
  }
}
