import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, Image } from 'react-native';
import { getPlaces } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Body, Thumbnail, List, ListItem, Left, Right, Badge } from 'native-base';
import colors from '../../colors'
import CardSuggestion from './common/cardSuggestion';
import OpenMap from './common/openMap';

const suggestions = [
    {icon: 'md-pizza', label: 'Food', value: 'food'},
    {icon: 'coffee', label: 'Coffees', value: 'coffee', type: "FontAwesome"},
    {icon: 'beer', label: 'Night', value: 'drink', type: "FontAwesome"},
    {icon: 'ticket', label: 'Fun', value: 'art', type: "FontAwesome"},
    {icon: 'md-cart', label: 'Shops', value: 'shops'},
  ];
class places extends Component {

  state = {
    placeName: '',
    places: [],
    latitude: null,
    longitude: null,
    ll: '',
    error: null,
    searchTerm: '',
    openMap: false,
    place: null,
    activeCategory: '',
  }


  componentDidMount(){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          ll:  position.coords.latitude + ',' + position.coords.longitude,
        });
        this.searchplaces();
      },
      (error) => {
        this.setState({ error: error.message });
        console.log('error', error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  getPlaces = (data) => {
    this.props.getPlaces(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })
  }
  setOpenMap = (value) => {
    this.setState({ openMap: value });
  }
  
  onChangeText = (text) => {

    this.setState({
      searchTerm: text,
    })
  }
  searchplaces = () => {
    const { searchTerm, ll } = this.state;
    const data = {query: searchTerm, ll: ll };

    this.props.getPlaces(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })
   
  }
  searchSuggestions = (suggestion) => {

    let suggestionValue = suggestion;

    if ( suggestionValue === this.state.activeCategory){
      suggestionValue = '';
    }
    this.set({activeCategory: suggestionValue});

    const data = {query: suggestionValue, ll: this.state.ll };

    this.props.getPlaces(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })

  }
  set = ( state ) => {
    this.setState(state);
  }

  renderSuggestions = () => {
    const { activeCategory } = this.state;

    return(
      <View style={styles.containerSuggestions}>
        {
          suggestions.map((suggestion, i) => 
            <TouchableOpacity key={i} style={activeCategory === suggestion.value ? styles.itemSuggestionActive : styles.itemSuggestion}
              onPress={this.searchSuggestions.bind(this, suggestion.value)}
              >
              <Icon  name={suggestion.icon} style={activeCategory === suggestion.value ? styles.iconSuggestionActive : styles.iconSuggestion} type={suggestion.type} />
              <Text style={activeCategory === suggestion.value ? styles.textSuggestionActive : styles.textSuggestion}>{suggestion.label}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
  render() {
    const { places,  places_refreshing} = this.props;

    return (
      <Container>
        <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
        <Header searchBar rounded style={styles.navigationBarStyle}>
          <Item style={styles.inputSearch}>
            <Icon name="ios-search" />
            <Input
              onChangeText={this.onChangeText}
              placeholder="What are you looking for?" />
          </Item>
          <Button
            onPress={this.searchplaces}
            transparent>
            <Text style={styles.textButtonSearch}>Search</Text>
          </Button>
        </Header>
        {this.renderSuggestions()}
        <FlatList
          showsVerticalScrollIndicator={false}
          //ListHeaderComponent={this.renderSuggestions}
          refreshing={places_refreshing}
          data = {places.toJS()}
          onRefresh={this.searchplaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({ item, index }) =>         
            <CardSuggestion item={item} index={index} set={this.set}/>
          }
        />
    
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    places_refreshing: state.places.places_refreshing,
    places: state.places.places,
    places_error: state.places.places_error,
  }
}

export default connect(state => ( mapStateToProps), { getPlaces })(places);