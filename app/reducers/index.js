import { combineReducers } from 'redux';
import * as eventsReducer from './events';
import routes from './routes';

export default combineReducers(Object.assign(
  routes,
  eventsReducer,
));