import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableHighlight, Geolocation } from 'react-native';
import { getPlaces } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Card, CardItem, Body } from 'native-base';

class Places extends Component {

  state = {
    placeName: '',
    places: [],
    latitude: null,
    longitude: null,
    ll: '',
    error: null,
    searchTerm: '',
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

  renderItem = (item, index) => {
    return(
      <Card>
        <CardItem>
          <Body>
            <Text>
              {item.name}
            </Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  onChangeText = (text) => {

    this.setState({
      searchTerm: text,
    })
  }
  searchPlaces = () => {
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
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={this.onChangeText}
              placeholder="Search" />
          </Item>
          <Button
            onPress={this.searchPlaces}
            transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList
          refreshing={places_refreshing}
          data = {places.toJS()}
          onRefresh={this.searchPlaces}
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

export default connect(state => ( mapStateToProps), { getPlaces })(Places);