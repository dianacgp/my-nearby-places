import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSuggestions } from '../../reducers/places/actions';
import Suggestions from './suggestions'

class Coffee extends Component {


  render() {
    const { suggestions,  suggestions_refreshing, suggestions_loaded, ll, getSuggestions, suggestions_error} = this.props;

    return (
      
      <Suggestions
        section='coffee'
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
    suggestions_refreshing: state.places.coffee_refreshing,
    suggestions: state.places.coffee,
    suggestions_error: state.places.coffee_error,
    suggestions_loaded: state.places.coffee_loaded,
    error_location: state.places.error_location,
    ll: state.places.ll
  }
}

export default connect(state => ( mapStateToProps), { getSuggestions })(Coffee);