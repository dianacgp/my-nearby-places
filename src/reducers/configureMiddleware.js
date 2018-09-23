/* @flow weak */
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Platform } from 'react-native';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import promiseMiddleware from 'redux-promise-middleware';
import storageFilter from 'redux-storage-decorator-filter';
import { createMiddleware as createStorageMiddleware, createLoader } from 'redux-storage';
import isomorphicFetch from 'isomorphic-fetch';
import { GET_SUGGESTIONS_FULFILLED, GET_PLACES_FULFILLED } from './places/actions'
import Moment from 'moment';

const apiUrl = 'https://api.foursquare.com/v2/';
const client_id = '5WCPOCQ4245Q0KBQRVNXVPSOMTX5S2ZRCAHVNNRHVYFKEPCE';
const client_secret = 'HRT4MKUUXALGGCVXZBMPDALG52DGR1NUFBRAOOGDJXGEMME1';
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const responseMiddleware = ({ dispatch, getState }) => next => action => {
  console.log(action);
};

const configureMiddleware = (composeWithDevTools, options) => {
  const engineKey = 'my-nearvy-places';
  const engine = createEngine && createEngine(engineKey);

  let decoratedEngine;
  if (engine) {
    decoratedEngine = storageFilter(engine, [
      'redux-storage:connexa',
      ['places', 'suggestions'],
    ], [
      'blacklisted-key',    // attributes not update
    ]);
  }

  const middlewares = [
    injectMiddleware({
      engine: engine,
      fetch: isomorphicFetch,
      date: () => Moment().format('YYYY-MM-DD'),
      apiUrl: () => apiUrl,
      authorization: 'client_id=' + client_id + '&client_secret=' + client_secret,
      thunk
    }),
    storage.createMiddleware(decoratedEngine, [], 
      [ 
        GET_PLACES_FULFILLED,
        GET_SUGGESTIONS_FULFILLED,
      ]),
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'FULFILLED', 'REJECTED'] })

  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  console.log('NODE_ENV: ' + process.env.NODE_ENV + '  __DEV__: ' + __DEV__);

  return composeWithDevTools(...enhancers);
};

export default configureMiddleware;
