import * as actions from './actions';
import Immutable,{ Record, List } from 'immutable';

const InitialState = Record({
  form_disabled: false,
  form_error: false,

  places: new List(),
  places_refreshing: false,
  places_loaded: false,
  places_error: false,

  food: new List(),
  food_refreshing: false,
  food_loaded: false,
  food_error: false,

  coffee: new List(),
  coffee_refreshing: false,
  coffee_loaded: false,
  coffee_error: false,

  drinks: new List(),
  drinks_refreshing: false,
  drinks_loaded: false,
  drinks_error: false,

  arts: new List(),
  arts_refreshing: false,
  arts_loaded: false,
  arts_error: false,

  shops: new List(),
  shops_refreshing: false,
  shops_loaded: false,
  shops_error: false,

  autocomplete: new List(),
  autocomplete_refreshing: false,
  autocomplete_loaded: false,
  autocomplete_error: false,

  place: null,

  search_place: '',

  error_location: false,

  ll: null,


});

const initialState = new InitialState;

export default function places_reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
      case `${actions.SET_ERROR_LOCATION}`:

      return state.merge({
        error_location: action.payload,
      });

      //------------------------------------------------
      case `${actions.SET_LL}`:

      return state.merge({
        ll: action.payload,
      });
      
    //------------------------------------------------

    case `${actions.SET_SEARCH_PLACE}`:

      return state.merge({
        search_place: action.payload,
      });
    //------------------------------------------------
    case 'GET_PLACES_FULFILLED':
    
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
      autocomplete:  [],
      autocomplete_loaded: false,
      autocomplete_error: false,


    });
    //------------------------------------------------

   case 'RECOMMENTATIONS_FOOD_FULFILLED':

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        food: result,
        food_refreshing: false,
        food_error: false,
        food_loaded: true,
      });
    case 'RECOMMENTATIONS_FOOD_REJECTED':
      return state.merge({
        food_refreshing: false,
        food_error: true,
        food_loaded: false,
      });
    case 'RECOMMENTATIONS_FOOD_REJECTED_FULFILLED':
      return state.merge({
        food_error: true,
        food_refreshing: false,
        food_loaded: false,
      });
    case 'RECOMMENTATIONS_FOOD_PENDING':
    return state.merge({
      food_error: false,
      food_refreshing: true,
      food: new List(),
      food_loaded: false,

    });
    //------------------------------------------------

    case `${actions.RECOMMENTATIONS_COFFEE}_FULFILLED`:

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        coffee: result,
        coffee_refreshing: false,
        coffee_error: false,
        coffee_loaded: true,
      });
    case `${actions.RECOMMENTATIONS_COFFEE}_REJECTED`:
      return state.merge({
        coffee_refreshing: false,
        coffee_error: true,
        coffee_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_COFFEE}_REJECTED_FULFILLED`:
      return state.merge({
        coffee_error: true,
        coffee_refreshing: false,
        coffee_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_COFFEE}_PENDING`:
    return state.merge({
      coffee_error: false,
      coffee_refreshing: true,
      coffee: new List(),
      coffee_loaded: false,

    });
    //------------------------------------------------
     case `${actions.RECOMMENTATIONS_DRINKS}_FULFILLED`:

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        drinks: result,
        drinks_refreshing: false,
        drinks_error: false,
        drinks_loaded: true,
      });
    case `${actions.RECOMMENTATIONS_DRINKS}_REJECTED`:
      return state.merge({
        drinks_refreshing: false,
        drinks_error: true,
        drinks_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_DRINKS}_REJECTED_FULFILLED`:
      return state.merge({
        drinks_error: true,
        drinks_refreshing: false,
        drinks_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_DRINKS}_PENDING`:
    return state.merge({
      drinks_error: false,
      drinks_refreshing: true,
      drinks: new List(),
      drinks_loaded: false,

    });
    //------------------------------------------------
     case `${actions.RECOMMENTATIONS_ARTS}_FULFILLED`:

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        arts: result,
        arts_refreshing: false,
        arts_error: false,
        arts_loaded: true,
      });
    case `${actions.RECOMMENTATIONS_ARTS}_REJECTED`:
      return state.merge({
        arts_refreshing: false,
        arts_error: true,
        arts_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_ARTS}_REJECTED_FULFILLED`:
      return state.merge({
        arts_error: true,
        arts_refreshing: false,
        arts_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_ARTS}_PENDING`:
    return state.merge({
      arts_error: false,
      arts_refreshing: true,
      arts: new List(),
      arts_loaded: false,

    });
    //------------------------------------------------
    case `${actions.RECOMMENTATIONS_SHOPS}_FULFILLED`:

      result =  [];
      if (action.payload.response.group.totalResults > 0){
       result = action.payload.response.group.results;
      }
      return state.merge({
        shops: result,
        shops_refreshing: false,
        shops_error: false,
        shops_loaded: true,
      });
    case `${actions.RECOMMENTATIONS_SHOPS}_REJECTED`:
      return state.merge({
        shops_refreshing: false,
        shops_error: true,
        shops_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_SHOPS}_REJECTED_FULFILLED`:
      return state.merge({
        shops_error: true,
        shops_refreshing: false,
        shops_loaded: false,
      });
    case `${actions.RECOMMENTATIONS_SHOPS}_PENDING`:
    return state.merge({
      shops_error: false,
      shops_refreshing: true,
      shops: new List(),
      shops_loaded: false,

    });
    //------------------------------------------------
    case `${actions.AUTOCOMPLETE}_FULFILLED`:

      results = [];
      if (action.payload.response.groups){
        action.payload.response.groups.map( group => {

          if (group.type === "unified"){
            results = group.items;
          }
         });
      }
      results.pop();

      return state.merge({
        autocomplete:  results,
        autocomplete_refreshing: false,
        autocomplete_error: false,
        autocomplete_loaded: true,
      });
    case `${actions.AUTOCOMPLETE}_REJECTED`:
      return state.merge({
        autocomplete_refreshing: false,
        autocomplete_error: true,
        autocomplete_loaded: false,
      });
    case `${actions.AUTOCOMPLETE}_REJECTED_FULFILLED`:
      return state.merge({
        autocomplete_error: true,
        autocomplete_refreshing: false,
        autocomplete_loaded: false,
      });
    case `${actions.AUTOCOMPLETE}_PENDING`:
    return state.merge({
      autocomplete_error: false,
      autocomplete_refreshing: true,
      autocomplete_loaded: false,

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
