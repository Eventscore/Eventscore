export default function locationReducer(state = {}, action) {  
  switch (action.type) {
    case 'GET_LOCATION':
      return Object.assign({}, state, {
        geolocation: action.geolocation
      });
    case 'GET_LOCATION_FAILED':
      return Object.assign({}, state, {
        geolocation: action.geolocation
      });
    default:
      return state;
  }
}