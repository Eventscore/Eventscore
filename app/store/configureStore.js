//Uncertain if this will work
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';

//this logs only in development mode
const loggerMiddleware = createLogger( { predicate: (getState, action) => __DEV__ });

export default function configureStore() {
  const enhancers = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );

  const store = createStore(reducers, enhancers);

  if(module.hot) {
    module.hot.accept( () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}