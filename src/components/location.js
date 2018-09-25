import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import { setErrorLocation, setLL } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import colors from '../../colors'
import Message from './common/message';
import Modal from "react-native-simple-modal";
import Spinner from './common/spinner';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants, Location, Permissions } from 'expo';

class ValidateLocation extends Component {

  state = {
    spinner: true,
    location: null,
    errorMessage: null,
    error: false,
  }


  componentDidMount(){

    this.setState({spinner: true, error: false});

    InteractionManager.runAfterInteractions(() => {  
      this.getLocationAsync();
    });
  }
  getLocationAsync = () => {
    let _this = this;
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      if( response.status !== 'granted'){
        this.setState({
          errorMessage: 'Permission to access location was denied',
          spinner: false,
        });
      }
      Location.getCurrentPositionAsync({})
      .then((location) => {

        this.setState({
          errorMessage: null,
          ll:  location.coords.latitude + ',' + location.coords.longitude,
          spinner: false,
        });
        Actions.tabbar();
        this.props.setLL(location.coords.latitude + ',' + location.coords.longitude);
        this.props.setErrorLocation(false);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error,
          spinner: false
        });
        this.props.setLL(null);
        this.props.setErrorLocation(true);
      })
    })
    .catch((error) => {
      this.props.setLL(null);
      this.props.setErrorLocation(true);
      this.setState({
        errorMessage: error,
        spinner: false
      });
    
    })
  }

  renderLoading = () => {

    return(
      <Spinner/>
    );
  }

  render() {

    const {  errorMessage, spinner } = this.state;

    if (spinner){
      this.renderLoading();
    }
    return (
      <View style={styles.flex}>
        {errorMessage !== null &&
          <Message 
            messageError={errorMessage.toString()} 
            textReload='Try Again' 
            error={true}
            reload={this.componentDidMount.bind(this)}
          />
        }
      </View>
    );

  }
}

const mapStateToProps = state => {
  return {
    error_location: state.places.error_location
  }
}

export default connect(state => ( mapStateToProps), { setErrorLocation, setLL })(ValidateLocation);