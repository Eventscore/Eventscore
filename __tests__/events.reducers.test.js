import eventsReducer from '../app/reducers/events';

describe(eventsReducer, () => {
  it('should set loadingEvents to true when action type is "REQUEST_EVENTS"', () => {
    expect(
      eventsReducer({}, { type: 'REQUEST_EVENTS', loadingEvents: true })
    ).toEqual({
      loadingEvents: true
    });
  });

  it('should set events to an array of events given from the action', () => {
    expect(
      eventsReducer({}, {
        type: 'RECEIVE_EVENTS',
        loadingEvents: false,
        cannotGetEvents: false,
        events: ['Jon Snow']
      })
    ).toEqual({
      loadingEvents: false,
      cannotGetEvents: false,
      events: ['Jon Snow']
    });
  });

  it('should set events to null when action type is "RECEIVE_EVENTS_FAILED"', () => {
    expect(
      eventsReducer({}, {
        type: 'RECEIVE_EVENTS_FAILED',
        loadingEvents: false,
        cannotGetEvents: true,
        events: null
      })
    ).toEqual({
      loadingEvents: false,
      cannotGetEvents: true,
      events: null
    });
  });

  it('should set currEvent to given event when action type is "CHANGE_CURR_EVENT"', () => {
    expect(
      eventsReducer({}, { type: 'CHANGE_CURR_EVENT', currEvent: 'Milk Steak' })
    ).toEqual({
      currEvent: 'Milk Steak'
    });
  });
  
});