export default function eventsReducer(state = {}, action) {  
  switch (action.type) {
    case 'REQUEST_EVENTS':
      return state;
    case 'RECEIVE_EVENTS':
      return Object.assign({}, state, {
        events: action.events
      });
    case 'RECEIVE_EVENTS_FAILED':
      return Object.assign({}, state, {
        events: action.events
      });
    // ...other actions
    case 'CHANGE_CURR_EVENT':
      return Object.assign({}, state, {
        currEvent: action.currEvent
      });
    case 'GET_LOCATION':
      return Object.assign({}, state, {
        geolocation: action.geolocation
      });
    case 'GET_LOCATION_FAILED':
      return Object.assign({}, state, {
        geolocation: action.geolocation
      });
    case 'REQUEST_EVENTS_FILTER':
      return Object.assign({}, state, {
        keyword: action.keyword,
        genre: action.genre,
        status: action.status
      });
    case 'REQUEST_EVENTS_FILTER_FAILED':
      return Object.assign({}, state, {
        keyword: action.keyword,
        genre: action.genre,
        status: action.status
      });      
    default:
      return state;
  }
}
