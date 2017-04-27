import eventsReducer from '../app/reducers/events';

describe(eventsReducer, () => {
  it('should set loadingEvents to true', () => {
    expect(
      eventsReducer({}, { type: 'REQUEST_EVENTS', loadingEvents: true })
    ).toEqual({
      loadingEvents: true
    });
  });
});