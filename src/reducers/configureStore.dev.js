import { createStore,combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as ui } from 'redux-ui'
import DevTools from './../containers/DevTools';
// import {routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise';

import errors from './error'
import taxForm from './taxForm'
import taxCalculation from './taxCalculation'
import taxSpending from './taxSpending'
import middlewares from './middlewares'

const reducers = combineReducers({
    ui,
    errors,
    form: taxForm,
    calculation: taxCalculation,
    spendings: taxSpending
})
const createEnhancers = () => compose(
      // Middleware you want to use in development:
      middlewares,
      DevTools.instrument(),
);

export default (initialState) => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(reducers, initialState, createEnhancers());

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)

    // if (module.hot) {
    //   module.hot.accept('./reducers', () =>
    //     store.replaceReducer(reducers)
    //   );
    // }
  return store;
}
