import * as LoginActions from './login';
import * as EventActions from './events';

export const ActionCreators = Object.assign( {}, EventActions, LoginActions );