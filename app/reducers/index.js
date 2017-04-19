import { combineReducers } from 'redux';
import routes from './routes';
import loginReducers from './login';
import signupReducers from './signup';
import eventsReducers from './events';
import locationReducers from './location';
// import * as loginReducers from './login';
// ... other reducers

export default combineReducers({
  loginReducers,
  signupReducers,
  eventsReducers,
  locationReducers,
  routes,
  // ... other reducers
});