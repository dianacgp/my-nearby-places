import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSuggestions } from '../../reducers/places/actions';
import styles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
import colors from '../../../colors'
import Suggestions from './suggestions'
import OpenMap from '../common/openMap';


class Home extends Component {

  state = {
    error: false,
  }



  
  set = ( state ) => {
    this.setState(state);
  }


  render() {
    const { suggestions,  suggestions_refreshing, suggestions_loaded, ll, getSuggestions, suggestions_error} = this.props;

    return (
      
      <Suggestions
        section='shops'
        getSuggestions={getSuggestions}
        ll={ll}
        refreshing={suggestions_refreshing}
        suggestions = {suggestions}
        set={this.set}
        suggestions_loaded={suggestions_loaded}
        suggestions_error={suggestions_error}
      />
    );

  }
}

const mapStateToProps = state => {
  return {
    suggestions_refreshing: state.places.shops_refreshing,
    suggestions: state.places.shops,
    suggestions_error: state.places.shops_error,
    suggestions_loaded: state.places.shops_loaded,
    error_location: state.places.error_location,
    ll: state.places.ll
  }
}

export default connect(state => ( mapStateToProps), { getSuggestions })(Home);