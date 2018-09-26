import React, { Component } from 'react';
import { View, InteractionManager, Image, TouchableOpacity } from 'react-native';
import { setErrorLocation, setLL } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import colors from '../../colors'
import Message from './common/message';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants, Location, Permissions } from 'expo';
const splash = require('../../assets/splash.png');

class ValidateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      location: null,
      errorMessage: null,
      error: false,

    };
  }

  componentDidMount(){
   
    InteractionManager.runAfterInteractions(() => {  
      this.getLocationAsync();
    });
  }
  getLocationAsync = () => {
    let _this = this;
    this.setState({spinner: true, error: false});
    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {
      if( response.status !== 'granted'){
        this.setState({
          errorMessage: 'Permission to access location was denied',
          spinner: false,
        });
      }
      this.setState({
      
        spinner: false
      });
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
        <View>
          <Spinner visible={this.state.spinner} />
        </View>
        {errorMessage !== null ?
          <Message 
            messageError={errorMessage.toString()} 
            textReload='Try Again' 
            error={true}
            reload={this.componentDidMount.bind(this)}
          />
        :
        <TouchableOpacity 
          onPress={this.componentDidMount.bind(this)}
          >
          <Image source={splash} style={styles.splash} resizeMethod={'resize'}/>
        </TouchableOpacity>
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