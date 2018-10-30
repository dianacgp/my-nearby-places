import React, { Component } from 'react';
import { Popup } from 'react-native-map-link'
var I18n = require('../translations/i18n');

export default class OpenMap extends Component {

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
            dialogTitle: I18n.t('openInMaps'),
            dialogMessage: place.name,
            cancelText: I18n.t('cancel')
          }}
        />
         
      );
    }else{
      return null;
    }
  }
}
