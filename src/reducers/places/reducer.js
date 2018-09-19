import * as actions from './actions';
import Immutable,{ Record, List } from 'immutable';

const InitialState = Record({
  form_disabled: false,
  form_error: false,

  places: new List(),
  places_refreshing: false,
  places_error: false,

  recommendations: new List(),
  recommendations_refreshing: false,
  recommendations_error: false,

});

const initialState = new InitialState;

export default function places_reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case `${actions.GET_PLACES}_FULFILLED`:
      
      return state.merge({
        places: action.payload.response.venues,
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
    case `${actions.GET_RECOMMENDATIONS}_FULFILLED`:
      return state.merge({
        recommendations: action.payload.response.group.results,
        recommendations_refreshing: false,
        recommendations_error: false,
      });
    case `${actions.GET_RECOMMENDATIONS}_REJECTED`:
      return state.merge({
        recommendations_refreshing: false,
        recommendations_error: true,
      });
    case `${actions.GET_RECOMMENDATIONS}_REJECTED_FULFILLED`:
      return state.merge({
        recommendations_error: true,
        recommendations_refreshing: false,
      });
    case `${actions.GET_RECOMMENDATIONS}_PENDING`:
    return state.merge({
      recommendations_error: false,
      recommendations_refreshing: true,
      recommendations: new List(),

    });

  }
  return state;
}
