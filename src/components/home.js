import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, Image } from 'react-native';
import { getSuggestions } from '../reducers/places/actions';
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
    {icon: 'beer', label: 'Night', value: 'drinks', type: "FontAwesome"},
    {icon: 'ticket', label: 'Fun', value: 'arts', type: "FontAwesome"},
    {icon: 'md-cart', label: 'Shops', value: 'shops'},

  ];
class Home extends Component {

  state = {
    placeName: '',
    suggestions: [],
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
          //ll: '48.8583701,2.2922926',
          ll:  position.coords.latitude + ',' + position.coords.longitude,
        });
        this.searchSuggestions();
      },
      (error) => {
        this.setState({ error: error.message });
        console.log('error', error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  getSuggestions = (data) => {
    this.props.getSuggestions(data)
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
  searchSuggestions = ( section = '') => {
    const { ll, activeCategory } = this.state;
    const data = {section: section, ll: ll };
    console.log('data', data);
    this.props.getSuggestions(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })
  }
  getCategory = () =>{
    return this.state.activeCategory;
  }
  
  searchCategories = (suggestion) => {

    let suggestionValue = suggestion;

    if ( suggestion === this.state.activeCategory){
      suggestionValue = '';
    }
    this.set({activeCategory: suggestionValue});

    this.searchSuggestions(suggestionValue);

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
              onPress={this.searchCategories.bind(this, suggestion.value)}
              >
              <Icon  name={suggestion.icon} style={activeCategory === suggestion.value ? styles.iconSuggestionActive : styles.iconSuggestion} type={suggestion.type} />
              <Text style={activeCategory === suggestion.value ? styles.textSuggestionActive : styles.textSuggestion}>{suggestion.label}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
  openSearch = () => {
    console.log('search');
    Actions.modal_search();
  }
  render() {
    const { suggestions,  suggestions_refreshing} = this.props;

    return (
      <Container>
        <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
        <Header searchBar rounded style={styles.navigationBarStyle}>
          <TouchableOpacity onPress={this.openSearch}>
            <Text>What are you looking for?</Text>
          </TouchableOpacity>
        </Header>
        {this.renderSuggestions()}
        <FlatList

          showsVerticalScrollIndicator={false}
          //ListHeaderComponent={this.renderSuggestions}
          refreshing={suggestions_refreshing}
          data = {suggestions.toJS()}
          onRefresh={this.searchSuggestions}
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
    suggestions_refreshing: state.places.suggestions_refreshing,
    suggestions: state.places.suggestions,
    suggestions_error: state.places.suggestions_error,
  }
}

export default connect(state => ( mapStateToProps), { getSuggestions })(Home);