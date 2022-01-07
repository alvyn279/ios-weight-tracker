/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './AppContainer';
import { Provider } from 'react-redux';
import store from './store';

import { name as appName } from './app.json';

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
