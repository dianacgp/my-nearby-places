
/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
//import devTools from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { composeWithDevTools } from 'remote-redux-devtools';

//import devTools from 'remote-redux-devtools';


export default function configureStore(options) {
	const composeEnhancers = composeWithDevTools({ });
	const middleware = configureMiddleware(composeEnhancers, options);
	const reducer = configureReducer({});

	const resetOnLogout = (reducer, initialState) => (state, action) => {

	  return reducer(state, action);
	};
	var data = {};

	const store = createStore(resetOnLogout(reducer, data), data, middleware);

  return store;
}
