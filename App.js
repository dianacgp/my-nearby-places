import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './home';
import configureStore from './src/reducers/configureStore';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';;

const store = configureStore();
const engineKey = 'redux-storage:myNearbyPlaces';
const engine = createEngine && createEngine(engineKey);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backPress: false,
      routes: ['home'],
      initialized: false,
      loaded: false,
    };
    
    this.store = configureStore();
     
 
  }
  
  render() {
    const { initialized, loaded } = this.state;

  
    return (      
      <Provider store={this.store}>        
        <Home/>        
      </Provider>     
    );
  }
}


