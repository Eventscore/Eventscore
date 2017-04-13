import { Actions } from 'react-native-router-flux';

const initialState = {
  name: '',
  username: '',
  password: '',
  email: '',
  isSigningIn: false,
  isSignedIn: false,
  token: '',
  userId: 0,
  error: null,
  status: null,
  response: null
};

export default function invokeSignupReducer(state = initialState, action) {
  switch (action.type) {
    case 'INVOKE_SIGNUP':
      return {
        name: action.name,
        username: action.username,
        password: action.password,
        email: action.email,
        isSigningIn: action.isLoggingIn,
        isSignedIn: action.isLoggedIn,
        token: '',
        userId: action.userId,
        error: action.error,
        status: action.status,
        response: action.response,
      };
      break;
    case 'INVOKE_FAILED_SIGNUP':
      return {
        name: action.name,
        username: action.username,
        password: action.password,
        email: action.email,        
        isSigningIn: action.isLoggingIn,
        isSignedIn: action.isLoggedIn,
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