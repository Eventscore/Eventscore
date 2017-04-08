import { combineReducers } from 'redux';
import * as eventsReducer from './events';

export default combineReducers(Object.assign(
  eventsReducer,
));