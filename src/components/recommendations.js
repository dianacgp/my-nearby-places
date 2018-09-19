import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableHighlight, Geolocation } from 'react-native';
import { getRecommendations } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Card, CardItem, Body, Thumbnail, List, ListItem, Left, Right } from 'native-base';

class recommendations extends Component {

  state = {
    placeName: '',
    recommendations: [],
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


  getRecommendations = (data) => {
    this.props.getRecommendations(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })
  }

  renderItem = (item, index) => {
    return(
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square  source={{ uri: item.photo.prefix + '100x100' + item.photo.suffix }} />
          </Left>
          <Body>
            <Text>{item.venue.name}</Text>
          </Body>
        </ListItem>
      </List>
    )
  }

  onChangeText = (text) => {

    this.setState({
      searchTerm: text,
    })
  }
  searchrecommendations = () => {
    const { searchTerm, ll } = this.state;
    const data = {query: searchTerm, ll: ll };

    this.props.getRecommendations(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    })
   
  }
  render() {
    const { recommendations,  recommendations_refreshing} = this.props;

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
            onPress={this.searchrecommendations}
            transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList
          refreshing={recommendations_refreshing}
          data = {recommendations.toJS()}
          onRefresh={this.searchrecommendations}
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
    recommendations_refreshing: state.places.recommendations_refreshing,
    recommendations: state.places.recommendations,
    recommendations_error: state.places.recommendations_error,
  }
}

export default connect(state => ( mapStateToProps), { getRecommendations })(recommendations);