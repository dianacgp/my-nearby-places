/* @flow weak */
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Platform } from 'react-native';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import promiseMiddleware from 'redux-promise-middleware';
import storageFilter from 'redux-storage-decorator-filter';
import { createMiddleware as createStorageMiddleware, createLoader } from 'redux-storage';

import { RECOMMENTATIONS_FOOD_FULFILLED, GET_PLACES_FULFILLED, SET_LANGUAGE_APP_FULFILLED } from './places/actions'
const axios = require('axios');

const apiUrl = 'https://api.foursquare.com/v2/';
const client_id = '5WCPOCQ4245Q0KBQRVNXVPSOMTX5S2ZRCAHVNNRHVYFKEPCE';
const client_secret = 'HRT4MKUUXALGGCVXZBMPDALG52DGR1NUFBRAOOGDJXGEMME1';
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const configureMiddleware = (composeWithDevTools, options) => {

  console.log(' configureMiddleware options', options)
  const engineKey = 'redux-storage:myNearbyPlaces';
  const engine = createEngine && createEngine(engineKey);

  let decoratedEngine;
  if (engine) {
    decoratedEngine = storageFilter(engine, [
      'my-nearvy-places',
      ['places', 'food'],
      ['places', 'languageApp'],
    ], [
      'blacklisted-key',    // attributes not update
    ]);
  }

  const middlewares = [
    injectMiddleware({
      engine: engine,
      fetch: axios,
      date: () => Moment().format('YYYY-MM-DD'),
      apiUrl: () => apiUrl,
      authorization: 'client_id=' + client_id + '&client_secret=' + client_secret,
      thunk
    }),
    storage.createMiddleware(decoratedEngine, [], 
      [ 
        GET_PLACES_FULFILLED,
        RECOMMENTATIONS_FOOD_FULFILLED,
        SET_LANGUAGE_APP_FULFILLED
      ]),
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'FULFILLED', 'REJECTED'] })

  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];


  return composeWithDevTools(...enhancers);
};

export default configureMiddleware;
