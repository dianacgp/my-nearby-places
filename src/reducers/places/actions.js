export const GET_PLACES_FULFILLED = 'GET_PLACES';
export const GET_PLACE = 'GET_PLACE';
export const GET_SUGGESTIONS_FULFILLED = 'GET_SUGGESTIONS';
export const AUTOCOMPLETE  = 'AUTOCOMPLETE';
export const SET_SEARCH_PLACE  = 'SET_SEARCH_PLACE';
export const SET_ERROR_LOCATION  = 'SET_ERROR_LOCATION';

export function setErrorLocation(value) {
  return {
    type: SET_ERROR_LOCATION,
    payload: value
  };
}
export function setSearchPlace(value) {
  return {
    type: SET_SEARCH_PLACE,
    payload: value
  };
}

export function getPlace(id) {
  return ({ apiUrl, authorization }) => {

    const  url = apiUrl() + 'venues/' + id + '?' +authorization + '&v=20180323';

    return {
      type: GET_PLACE,
      payload: fetch(url, {
        method: 'GET',
      })
      .then(response => {
        const responseJSON = response.json();
        if(response.status !== 200)
          throw responseJSON;
        else 
          return responseJSON
      })
    };
  };
}

export function getPlaces(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'search/recommendations?' + authorization + '&v=20180323&ll='+data.ll+'&query='+ data.query + data.filters;

    return {
      type: 'GET_PLACES',
      payload: fetch(url, {
        method: 'GET',
      })
      .then(response => {

        const responseJSON = response.json();
        if(response.status !== 200)
          throw responseJSON;
        else 
          return responseJSON
      })
    };
  };
}

export function getAutocomplete(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'search/autocomplete?' + authorization + '&v=20180323&ll='+data.ll+'&query='+ data.query;

    return {
      type: AUTOCOMPLETE,
      payload: fetch(url, {
        method: 'GET',
      })
      .then(response => {

        const responseJSON = response.json();
        if(response.status !== 200)
          throw responseJSON;
        else 
          return responseJSON
      })
    };
  };
}
export function getSuggestions(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'search/recommendations?' + authorization + '&v=20180323&ll='+data.ll+'&section='+ data.section;

    return {
      type: 'GET_SUGGESTIONS',
      payload: fetch(url, {
        method: 'GET',
      })
      .then(response => {

        const responseJSON = response.json();
        if(response.status !== 200)
          throw responseJSON;
        else 
          return responseJSON
      })
    };
  };
}