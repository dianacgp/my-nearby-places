import * as actions from './actions';
import Immutable,{ Record, List } from 'immutable';

const InitialState = Record({
  form_disabled: false,
  form_error: false,

  places: new List(),
  places_refreshing: false,
  places_error: false,

  place: null,

});

const initialState = new InitialState;

export default function places_reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    // case `${actions.GET_PLACES}_FULFILLED`:
      
    //   return state.merge({
    //     places: action.payload.response.venues,
    //     places_refreshing: false,
    //     places_error: false,
    //   });
    // case `${actions.GET_PLACES}_REJECTED`:
    //   return state.merge({
    //     places_refreshing: false,
    //     places_error: true,
    //   });
    // case `${actions.GET_PLACES}_REJECTED_FULFILLED`:
    //   return state.merge({
    //     places_error: true,
    //     places_refreshing: false,
    //   });
    // case `${actions.GET_PLACES}_PENDING`:
    //   return state.merge({
    //     places_error: false,
    //     places_refreshing: true,
    //     places: new List(),

    //   });
    //------------------------------------------------
    case `${actions.GET_PLACES}_FULFILLED`:

      //console.log('totalResults', action.payload.response.group.totalResults)
      let result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        places: result,
        places_refreshing: false,
        places_error: false,
      });
    case `${actions.GET_PLACES}_REJECTED`:
      return state.merge({
        places_refreshing: false,
        places_error: true,
      });
    case `${actions.GET_PLACES}_REJECTED_FULFILLED`:
      return state.merge({
        places_error: true,
        places_refreshing: false,
      });
    case `${actions.GET_PLACES}_PENDING`:
    return state.merge({
      places_error: false,
      places_refreshing: true,
      places: new List(),

    });

    //------------------------------------------------
    case `${actions.GET_PLACE}_FULFILLED`:
      return state.merge({
        place: action.payload.response.venue,
      });
    case `${actions.GET_PLACE}_REJECTED`:
      return state.merge({
        form_error: true,
      });
    case `${actions.GET_PLACE}_REJECTED_FULFILLED`:
      return state.merge({
        form_error: true,
      });
    case `${actions.GET_PLACE}_PENDING`:
    return state.merge({
      form_error: false,
      place: null,

    });

  }
  return state;
}
