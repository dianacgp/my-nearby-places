export const GET_SLIDES = 'GET_SLIDES';
export const GET_TEST = 'GET_TEST';
export const ADD_TEST = 'ADD_TEST';
export const GET_PLACES = 'GET_PLACES';

export function getPlaces(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'venues/search?' + authorization + '&v=20180323&limit=10&ll='+data.ll+'&query='+ data.query;

    return {
      type: GET_PLACES,
      payload: fetch(url, {
        method: 'GET',
      })
      .then(response => {
        console.log('en getPlaces', response);
        const responseJSON = response.json();
        if(response.status !== 200)
          throw responseJSON;
        else 
          return responseJSON
      })
    };
  };
}