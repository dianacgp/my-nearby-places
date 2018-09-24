import React, { Component } from 'react';
import { View } from 'react-native';
import Message from './common/message';
import Modal from "react-native-simple-modal";
import { Actions } from 'react-native-router-flux';

export default class Location extends Component {

  reload = () => {
    Actions.pop();
    this.props.reload();
  }

  render() {
    const { error, modalError } = this.props;
    return(
      <Modal 
        closeOnTouchOutside={false}
        open={this.props.modalError}
        style={{flex: 1}}
      >  
        <View>

          <Message 
            messageError={error.toString()} 
            textReload='Try Again' 
            error={true}
            reload={this.reload}
          />
          
        </View>
      </Modal>
    );
  }
}
