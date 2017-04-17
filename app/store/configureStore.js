import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

export default function configureStore (initialState) {
  // const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  const store = createStore(reducers, initialState, enhancer);
  // const store = compose(
  //   applyMiddleware(...middleware))(createStore)(reducers);

  // if (module.hot) {
  //   module.hot.accept(() => {
  //     const nextRootReducer = require('../reducers/index').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }
  return store;
}
