import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { getPlaces } from '../../reducers/places/actions';
import { connect } from 'react-redux';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Text, Body, Thumbnail, List, ListItem, Left, Right, Badge } from 'native-base';
import colors from '../../../colors'
import CardSuggestion from '../common/cardSuggestion';
import OpenMap from '../common/openMap';
import Filters from './filters';
import Sort from './sort';
import Modal from "react-native-simple-modal";

const styles = StyleSheet.create({
  containerFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  sort: {
    flexDirection: 'row',
  },
  iconSort: {
    marginRight: 5,
  },
   container: {
    backgroundColor: 'white',
    padding: 10,
   
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
  },
  filterInactive: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.grayVeryLight,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  textFilterInactive: {
    color: colors.text_secondary,
    fontSize: 12,
  },
  filterActive: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.principal,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  textFilterActive: {
    color: 'white',
    fontSize: 12,
  },
  

});

class Home extends Component {

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
    showSort: false,
    showFilters: false, 
    filters: new Map()
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
  searchPlaces = (  ) => {
    const { searchTerm, ll } = this.state;
    const data = {query: searchTerm, ll: ll, filters: this.getFilters() };

    this.props.getPlaces(data)
    .then((response) => {
      console.log('response', response);
    })
    .catch((e) => {
      console.log('e', e)
    });
  }
  set = ( state ) => {
    this.setState(state);
  }
  setModalFilters(visible) {
    this.setState({showFilters: visible});
  }
  setModalSort(visible) {
    this.setState({showSort: visible});
  }

  getFilters = () => {
    const { filters } = this.state;
    let prices = '';
    let flagPrices = false;
    let searchFilters = '';
    console.log('filters', filters)
    for ( var v of filters.values() ) {

      if (v.category === 'openNow'){
        searchFilters = '&openNow=' + v.value;
      }
      if (v.category === 'sortByDistance'){
        searchFilters = '&sortByDistance=' + v.value;
      }
      if (v.category === 'price'){
        flagPrices = true;
        prices  = prices + v.value + ',' ;
      }
    }

    if (flagPrices){
      searchFilters = searchFilters + '&price=' + prices.slice(0,-1);
    }

    return searchFilters;
  }


  render() {
    const { places,  places_refreshing} = this.props;
    const {filters, showFilters} = this.state;

    if (this.state.showFilters){
      return(
        <Modal 
          closeOnTouchOutside={false}
          open={this.state.showFilters}
          style={{flex: 1}}
        > 
          <Filters set={this.set} filters={filters} searchPlaces={this.searchPlaces}/>
        </Modal>

      )
    }else{
      if (this.state.showSort){
          return(
            <Modal 
              closeOnTouchOutside={false}
              open={this.state.showSort}
              style={{flex: 1}}
            > 
              <Sort set={this.set} filters={filters} searchPlaces={this.searchPlaces}/>
            </Modal>

          )
        }else{
        return (
          <Container>

            <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
            <Header searchBar rounded style={basicStyles.navigationBarStyle}>
              <Item style={basicStyles.inputSearch}>
                <Icon name="search" />
                <Input
                  onChangeText={this.onChangeText}
                  placeholder="Search near me" />
              </Item>
              <Button
                disabled={this.state.searchTerm.trim().length === 0 ? true : false}
                onPress={this.searchPlaces}
                color={colors.principal}
                title="Search"
              />
            </Header>

            <View style={styles.containerFilters}>
              <TouchableOpacity 
                style={styles.sort}
                onPress={this.setModalSort.bind(this, !this.state.showSort)}>
                <Icon name="sort-down" size={30} color={colors.grayLighter} style={styles.iconSort}/>
                <Icon name="list" size={30} color={colors.grayLighter} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={this.setModalFilters.bind(this, !this.state.showFilters)}
                >
                <Icon name="filter" size={30} color={ filters.size > 1 ?  colors.principal : colors.grayLighter} />
              </TouchableOpacity>
            </View>
            <FlatList
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              refreshing={places_refreshing}
              data = {places.toJS()}
              onRefresh={this.searchPlaces}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({ item, index }) =>         
                <CardSuggestion item={item} index={index} set={this.set}/>
              }
            />
        
          </Container>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    places_refreshing: state.places.places_refreshing,
    places: state.places.places,
    places_error: state.places.places_error,
  }
}

export default connect(state => ( mapStateToProps), { getPlaces })(Home);