export const GET_PLACES_FULFILLED = 'GET_PLACES_FULFILLED';
export const GET_PLACE = 'GET_PLACE';
export const RECOMMENTATIONS_FOOD_FULFILLED = 'RECOMMENTATIONS_FOOD_FULFILLED';
export const RECOMMENTATIONS_COFFEE = 'RECOMMENTATIONS_COFFEE';
export const RECOMMENTATIONS_DRINKS = 'RECOMMENTATIONS_DRINKS';
export const RECOMMENTATIONS_ARTS = 'RECOMMENTATIONS_ARTS';
export const RECOMMENTATIONS_SHOPS = 'RECOMMENTATIONS_SHOPS';
export const AUTOCOMPLETE  = 'AUTOCOMPLETE';
export const SET_SEARCH_PLACE  = 'SET_SEARCH_PLACE';
export const SET_ERROR_LOCATION  = 'SET_ERROR_LOCATION';
export const SET_LL  = 'SET_LL';
export const SET_LANGUAGE_APP_FULFILLED = 'SET_LANGUAGE_APP_FULFILLED';

export function setLanguageApp(languageApp) {
  return {
    type: 'SET_LANGUAGE_APP_FULFILLED',
    payload: { languageApp }
  };
}

export function setLL(value) {
  return {
    type: SET_LL,
    payload: value
  };
}
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

export function getAutocomplete(ll, query) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'search/autocomplete?explicit-lang=true&group=unified&' + authorization + '&v=20180323&ll='+ll+'&query='+ query;

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
export function getSuggestions(section, data) {
    return ({ apiUrl, authorization }) => {
    const  url = apiUrl() + 'search/recommendations?' + authorization + '&v=20180323&ll='+data.ll+'&section='+ data.section+ '&sortByDistance=1';

    return {
      type: 
        section === 'food' ? 
          'RECOMMENTATIONS_FOOD' 
        : section === 'coffee' ? 
          RECOMMENTATIONS_COFFEE
        : section === 'drinks' ? 
          RECOMMENTATIONS_DRINKS 
        : section === 'arts' ?
          RECOMMENTATIONS_ARTS
        : section === 'shops' ?
          RECOMMENTATIONS_SHOPS
        :
          'RECOMMENTATIONS_FOOD' ,
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