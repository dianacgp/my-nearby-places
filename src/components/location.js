import React, { Component } from 'react';
import { View } from 'react-native';
import Message from './common/message';
import Modal from "react-native-simple-modal";
import { Actions } from 'react-native-router-flux';

const PERMISSION_DENIED = 'Please change the location permissions for this application in the configuration of your applications';
export default class Location extends Component {

  reload = () => {
    Actions.pop();
    this.props.reload();
  }

  render() {
    const { error, modalError } = this.props;
    console.log('error', error)
    return(
      <Modal 
        closeOnTouchOutside={false}
        open={this.props.modalError}
        style={{flex: 1}}
      >  
        <View>
          {error.PERMISSION_DENIED === 1 &&
          <Message 
            messageError={error.message + ' \n' + PERMISSION_DENIED } 
            textReload='Try Again' 
            error={true}
            reload={this.reload}
            />
          }
        </View>
      </Modal>
    );
  }
}
