import React, { Component } from 'react';
import { Popup } from 'react-native-map-link'

export default class open extends Component {



  render() {

    const { place, open, setOpenMap } = this.props;

    if (place && place.location){
      return (
        <Popup
          isVisible={open}
          onCancelPressed={() => setOpenMap( false )}
          onAppPressed={() => setOpenMap(false )}
          onBackButtonPressed={() => setOpenMap( false )}
          options={{
            latitude: place.location.lat,
            longitude: place.location.lng,
            title: place.name,
            dialogTitle: 'Open in Maps',
            dialogMessage: place.name,
            cancelText: 'Cancel'
          }}
        />
         
      );
    }else{
      return null;
    }
  }
}
