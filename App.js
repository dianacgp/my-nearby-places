import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/reducers/configureStore';
import Scenes from './src/components/scenes';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const store = configureStore();
const engineKey = 'my-nearvy-places';
const engine = createEngine && createEngine(engineKey);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Scenes/>
      </Provider>
    );
  }
}