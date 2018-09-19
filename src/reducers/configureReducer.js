
import places from './places/reducer';

import { combineReducers } from 'redux';
import * as storageRedux from 'redux-storage'
import merger from 'redux-storage-merger-immutablejs'

const configureReducer = (initialState: {}) => {
	let reducer = combineReducers({
		places,
	});
	return storageRedux.reducer(reducer, merger);
}

export default configureReducer;
