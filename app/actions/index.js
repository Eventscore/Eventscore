import * as LoginActions from './login';
import * as EventActions from './events';
import * as LocationActions from './location';
import * as ListTypeActions from './listType';

export const ActionCreators = Object.assign( {}, EventActions, LoginActions, LocationActions, ListTypeActions );