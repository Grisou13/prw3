import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.sass';

import configureStore from './reducers'
import {appBoot} from './actions/app'

import App from './containers/App';
import DevTools from './containers/DevTools'

import registerServiceWorker from './registerServiceWorker';

const initialState = {}
const store = configureStore(initialState)
store.dispatch(appBoot())
const render = () =>{
  ReactDOM.render(
    (
      <Provider store={store}>
        <div>
          <App />
          {process.env.NODE_ENV === 'production' ? null: <DevTools />}
        </div>
      </Provider>
    ), document.getElementById('root'));
}

render();
registerServiceWorker();
