import { combineReducers } from 'redux';
import routes from './routes';
import * as loginReducers from './login';
// ... other reducers

export default combineReducers({
  loginReducers,
  routes,
  // ... other reducers
});
