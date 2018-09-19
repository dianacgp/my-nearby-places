export const GET_PLACES = 'GET_PLACES';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

export function getPlaces(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'venues/search?' + authorization + '&v=20180323&limit=10&ll='+data.ll+'&query='+ data.query;

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

export function getRecommendations(data) {
  return ({ apiUrl, authorization }) => {
     
    const  url = apiUrl() + 'search/recommendations?' + authorization + '&v=20180323&limit=10&ll='+data.ll+'&query='+ data.query;

    return {
      type: GET_RECOMMENDATIONS,
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