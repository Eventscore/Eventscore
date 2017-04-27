// import { changeCurrEvent, fetchNearbyEvents } from '../app/actions/events';
import * as eventsActions from '../app/actions/events';
import * as types from '../app/actions/types';
import nock from 'nock';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('changeCurrEvent', () => {
  it('should have a type of "CHANGE_CURR_EVENT"', () => {
    expect(eventsActions.changeCurrEvent().type).toEqual('CHANGE_CURR_EVENT');
  });
});

describe('fetchNearbyEvents', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates REQUEST_EVENTS when network request is initiated and then creates RECEIVE_EVENTS when fetchNearbyEvents has been completed', () => {
    nock('https://eventscore-server-production.herokuapp.com')
      .get('/api/events/longitude/0/latitude/0')
      .reply(200, [{someEventName: 'Rum Ham'}]);

    
    const store = mockStore({});
    return store.dispatch(eventsActions.fetchNearbyEvents(0, 0))
      .then(() => {
        // declare expectedActions here because of asynchronous diff btwn Date.now() calls
        const expectedActions = [
          {
            type: types.REQUEST_EVENTS,
            loadingEvents: true
          },
          {
            type: types.RECEIVE_EVENTS,
            events: [{someEventName: 'Rum Ham'}],
            loadingEvents: false,
            cannotGetEvents: false,
            receivedAt: Date.now()
          }
        ];

        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});

// example
// describe('saveEvent', () => {
//   it('should have a type of "SAVE_EVENT"', () => {
//     expect(saveEvent().type).toEqual('SAVE_EVENT');
//   });
// });