import { combineReducers } from 'redux';
import routes from './routes';
import loginReducers from './login';
import addCountExample from './addCountExample';
import eventsReducers from './events';
// import * as loginReducers from './login';
// ... other reducers

export default combineReducers({
  addCountExample,
  loginReducers,
  eventsReducers,
  routes,
  // ... other reducers
});
