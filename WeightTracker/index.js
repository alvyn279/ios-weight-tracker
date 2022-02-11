/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';

import App from './AppContainer';
import store from './store';

import { name as appName } from './app.json';

const AppWithStore = () => (
  <Provider store={store}>
    <App />
    <ModalPortal />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
