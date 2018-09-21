
export function getLocation(location){

  let formattedAddress = '';

  if(location.formattedAddress){
    if(location.formattedAddress){
      location.formattedAddress.map( (data) => {
        formattedAddress = formattedAddress + data + ' ';
      });
    } 
  }
  return formattedAddress
}
