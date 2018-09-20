export const GET_PLACES = 'GET_PLACES';
export const GET_PLACE = 'GET_PLACE';

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
     
    const  url = apiUrl() + 'search/recommendations?' + authorization + '&v=20180323&ll='+data.ll+'&query='+ data.query;

    return {
      type: GET_PLACES,
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