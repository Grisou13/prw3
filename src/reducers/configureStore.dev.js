import { createStore,combineReducers, compose } from 'redux'
import { reducer as ui } from 'redux-ui'
import DevTools from './../containers/DevTools';
// import {routerReducer, routerMiddleware } from 'react-router-redux'

import errors from './error'
import taxForm from './taxForm'
import taxCalculation from './taxCalculation'
import taxSpending from './taxSpending'
import middlewares from './middlewares'
import { APP_READY } from '../consts/app';

const app = (state = {ready:false}, {type, payload, ...meta}) => {
  switch(type){
    case APP_READY:
      return {...state, ready:true}
    default:
      return state
  }
}
const reducers = combineReducers({
    ui,
    errors,
    app,
    form: taxForm,
    calculation: taxCalculation,
    spendings: taxSpending
})

const createEnhancers = () => compose(
      // Middleware you want to use in development:
      middlewares,
      DevTools.instrument()
)

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
