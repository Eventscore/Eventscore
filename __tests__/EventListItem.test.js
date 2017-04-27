import 'react-native';
import React from 'react';
import EventListItem from '../app/containers/EventListItem';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const initialState = {
  event: {
    artists: [{
      name: 'Jon Snow'
    }]
  }
};

const mockStore = configureStore(initialState);
const store = mockStore(initialState);
console.log('store: ', store);

xit('EventListItem renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}><EventListItem /></Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});