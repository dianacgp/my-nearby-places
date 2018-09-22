import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, Image } from 'react-native';
import { getPlaces } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Body, Thumbnail, List, ListItem, Left, Right, Badge } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../colors'
const General = require('../functions/general.js');
import OpenMap from './common/openMap';


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


  renderItem = (item, index) => {

    return(
      <TouchableOpacity 
        key={index} 
        style={styles.containerItem}
        onPress={()=> {Actions.modal_place({item: item})}}>
        <View style={styles.bodyItem}>
          <View 
            style={styles.body}
            >
            <Text style={styles.name}>{item.venue.name}</Text>
            <View style={styles.row}>
              {item.venue.location &&
                <Text style={styles.textVerySmall}>{General.getLocation(item.venue.location)}  <Text style={styles.link} onPress={()=> {this.setState({openMap: true, place: item.venue})}} >Open in Maps</Text></Text>
              }
             
            </View> 

            { item.venue.categories && item.venue.categories.map( (category, i) =>
            <View  key={i} style={styles.labels}>
              <View primary  style={styles.badge}>
                <Text style={styles.textBadge}>{category.shortName}</Text>
              </View>
            </View>
            )} 
          </View>
          <View>
            { item.photo !== undefined ? 
            <Image  style={styles.imagePlace} source={{ uri: item.photo.prefix + '200x200' + item.photo.suffix }} />
            :
            <View style={styles.withoutImage}>
              <IconFontAwesome name="picture-o" size={30} color={colors.grayLighter} />
            </View>
            }
          </View>
        </View>
        <View style={styles.bodyItem}>
          { item.snippets.count > 0 && item.snippets.items.map((snippet, i) =>
            snippet.detail !== undefined &&
            <View key={i}>
              <Text style={styles.textSmall}>{snippet.detail.object.text}</Text>
            </View>
          )}
        </View>

      </TouchableOpacity>
    )
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

        <View style={styles.containerSuggestions}>
          <TouchableOpacity style={styles.itemSuggestion}>
            <Icon  name="md-pizza" style={styles.iconSuggestion} />
            <Text style={styles.textSuggestion}>Food</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemSuggestion}>
            <Icon type="FontAwesome" name="coffee" style={styles.iconSuggestion} />
            <Text style={styles.textSuggestion}>Coffees</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemSuggestion}>
            <Icon type="FontAwesome" name="beer" style={styles.iconSuggestion} />
            <Text style={styles.textSuggestion}>Night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemSuggestion}>
            <Icon type="FontAwesome" name="ticket" style={styles.iconSuggestion} />
            <Text style={styles.textSuggestion}>Fun</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemSuggestion}>
            <Icon name="md-cart" style={styles.iconSuggestion} />
            <Text style={styles.textSuggestion}>Shopping</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          refreshing={places_refreshing}
          data = {places.toJS()}
          onRefresh={this.searchplaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({ item, index }) =>         
            this.renderItem(item, index)
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