import { combineReducers } from 'redux';
import routes from './routes';
import addCountExample from './addCountExample';
import loginReducers from './login';
import signupReducers from './signup';
import eventsReducers from './events';
// import * as loginReducers from './login';
// ... other reducers

export default combineReducers({
  addCountExample,
  loginReducers,
  signupReducers,
  eventsReducers,
  routes,
  // ... other reducers
});
