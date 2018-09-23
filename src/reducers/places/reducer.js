import * as actions from './actions';
import Immutable,{ Record, List } from 'immutable';

const InitialState = Record({
  form_disabled: false,
  form_error: false,

  places: new List(),
  places_refreshing: false,
  places_loaded: false,
  places_error: false,

  suggestions: new List(),
  suggestions_refreshing: false,
  suggestions_loaded: false,
  suggestions_error: false,

  autocomplete: new List(),
  autocomplete_refreshing: false,
  autocomplete_error: false,

  place: null,

  search_place: '',


});

const initialState = new InitialState;

export default function places_reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {


    case `${actions.SET_SEARCH_PLACE}`:

      return state.merge({
        search_place: action.payload,
      });
    //------------------------------------------------
    case 'GET_PLACES_FULFILLED':

      // console.log('totalResults', action.payload.response.group.totalResults)
      let result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        places: result,
        places_refreshing: false,
        places_error: false,
        places_loaded: true,
      });
    case 'GET_PLACES_REJECTED':
      return state.merge({
        places_refreshing: false,
        places_error: true,
        places_loaded: false,
      });
    case 'GET_PLACES__REJECTED_FULFILLED':
      return state.merge({
        places_error: true,
        places_refreshing: false,
        places_loaded: false,
      });
    case 'GET_PLACES_PENDING':
    return state.merge({
      places_error: false,
      places_refreshing: true,
      places: new List(),
      places_loaded: false,

    });
     //------------------------------------------------
    case 'GET_SUGGESTIONS_FULFILLED':

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        suggestions: result,
        suggestions_refreshing: false,
        suggestions_error: false,
        suggestions_loaded: true,
      });
    case 'GET_SUGGESTIONS_REJECTED':
      return state.merge({
        suggestions_refreshing: false,
        suggestions_error: true,
        suggestions_loaded: false,
      });
    case 'GET_SUGGESTIONS_REJECTED_FULFILLED':
      return state.merge({
        suggestions_error: true,
        suggestions_refreshing: false,
        suggestions_loaded: false,
      });
    case 'GET_SUGGESTIONS_PENDING':
    return state.merge({
      suggestions_error: false,
      suggestions_refreshing: true,
      suggestions: new List(),
      suggestions_loaded: false,

    });
    //------------------------------------------------
    case `${actions.AUTOCOMPLETE}_FULFILLED`:

      console.log('payload', action.payload)
      return state.merge({
        //autocomplete: ,
        autocomplete_refreshing: false,
        autocomplete_error: false,
      });
    case `${actions.AUTOCOMPLETE}_REJECTED`:
      return state.merge({
        autocomplete_refreshing: false,
        autocomplete_error: true,
      });
    case `${actions.AUTOCOMPLETE}_REJECTED_FULFILLED`:
      return state.merge({
        autocomplete_error: true,
        autocomplete_refreshing: false,
      });
    case `${actions.AUTOCOMPLETE}_PENDING`:
    return state.merge({
      autocomplete_error: false,
      autocomplete_refreshing: true,

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
