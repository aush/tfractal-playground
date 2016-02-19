import App from '../src/components/App';
import createStore from '../src/redux/createStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { apllyConfigurationFromHash } from '../src/redux/ducks/configuration';
import { Provider } from 'react-redux';

const store = createStore();

const handleNewHash = () => {
  if (window.location.hash) {
    store.dispatch(apllyConfigurationFromHash(window.location.hash.substring(1)));
  }
};

handleNewHash();
window.addEventListener('hashchange', handleNewHash, false);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
