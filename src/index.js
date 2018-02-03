import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.sass';

import configureStore from './reducers'

import App from './containers/App';
import DevTools from './containers/DevTools'

import registerServiceWorker from './registerServiceWorker';

const initialState = {}
const store = configureStore(initialState)
const render = () =>{
  ReactDOM.render(
    (
      <Provider store={store}>
        <div>
          <App />
          {process.env.NODE_ENV !== 'production' ? null: <DevTools />}
        </div>
      </Provider>
    ), document.getElementById('root'));
}
render();
registerServiceWorker();
