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
    default:
      return state;
  }
}
