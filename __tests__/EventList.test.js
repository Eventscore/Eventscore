import 'react-native';
import React from 'react';
import EventList from '../app/containers/EventList';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'react-test-renderer';

const initialState = {events: [{name: 'Rum Ham'}]};
const mockStore = configureStore(initialState);
const store = mockStore(initialState);

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}><EventList /></Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});