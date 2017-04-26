import { events } from '../app/actions/events';

describe('changeCurrEvent', () => {
  it('should have a type of "CHANGE_CURR_EVENT"', () => {
    expect(events.changeCurrEvent().type).toEqual('CHANGE_CURR_EVENT');
  });
});

// example
// describe('saveEvent', () => {
//   it('should have a type of "SAVE_EVENT"', () => {
//     expect(saveEvent().type).toEqual('SAVE_EVENT');
//   });
// });