import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, Image, StyleSheet, Button, InteractionManager } from 'react-native';
import { getPlaces, setSearchPlace } from '../../reducers/places/actions';
import { connect } from 'react-redux';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../colors'
import CardSuggestion from '../common/cardSuggestion';
import SearchBar from '../common/searchBar';
import OpenMap from '../common/openMap';
import Filters from './filters';
import Message from '../common/message';
import Sort from './sort';
import Modal from "react-native-simple-modal";
import Styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const dismissKeyboard = require('dismissKeyboard');

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      places: [],
      latitude: null,
      longitude: null,
      ll: '',
      error: null,
      searchTerm: this.props.search_place,
      openMap: false,
      place: null,
      showSort: false,
      showFilters: false, 
      filters: new Map()
    };
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            //ll: '48.8583701,2.2922926',
            ll:  position.coords.latitude + ',' + position.coords.longitude,
          });
          //Actions.refresh({renderTitle: this.renderTitle})
        },
        (error) => {
          this.setState({ error: error.message });
          console.log('error', error)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
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
    });
    //Actions.refresh({renderTitle: this.renderTitle})

  }
  searchPlaces = (  ) => {
    dismissKeyboard();
    const { searchTerm, ll } = this.state;
    const data = {query: searchTerm, ll: ll, filters: this.getFilters() };
    this.props.setSearchPlace(searchTerm);
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
    dismissKeyboard();
    this.setState({showFilters: visible});
  }
  setModalSort(visible) {
    dismissKeyboard();
    this.setState({showSort: visible});
  }

  getFilters = () => {
    const { filters } = this.state;
    let prices = '';
    let flagPrices = false;
    let searchFilters = '';

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

  renderTitle = () => {
    return(
      <SearchBar
        showButton= {true}
        refreshing={this.props.places_refreshing}
        TextInput={{
          onChangeText: this.onChangeText, 
          placeholder: "Search near me",
          value: this.state.searchTerm,
          autoFocus: false,
        }}
        Button={{
          disabled: this.state.searchTerm.trim().length === 0 ? true : false,
          onPress: this.searchPlaces
        }}
      />
    )
  }
  renderFooter = () => {

    const { places, places_error, places_loaded  } = this.props;

    return(
      <View>
        {
          places_error ? 
            <Message error={true} reload={this.searchPlaces}/>
        :
          places.size === 0 && places_loaded &&
            <Message message='We do not find results near you'/>
        }
      </View>
    )
  }

  renderHeader = () => {
    const { filters } = this.state;
    return(
      <View style={styles.containerFilters}>
        <TouchableOpacity 
          style={styles.sort}
          onPress={this.setModalSort.bind(this, !this.state.showSort)}>
          <Icon name="sort" size={30} color={colors.principal} style={styles.iconSort}/>
          <Icon name="list" size={30} color={colors.principal} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.setModalFilters.bind(this, !this.state.showFilters)}
          >
          <Icon name="filter" size={30} color={ filters.size > 1 ?  colors.principal : colors.grayLighter} />
        </TouchableOpacity>
      </View>
    );
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
          <KeyboardAwareScrollView
            ref='scroll'
            keyboardShouldPersistTaps="always"
            extraHeight={125}
          >

            <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
            {this.renderTitle()}
            {this.renderHeader()}

            <View style={{minHeight: 500}}>
              <FlatList

                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                ListFooterComponent={this.renderFooter}
                refreshing={places_refreshing}
                data = {places.toJS()}
                onRefresh={this.searchPlaces}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {({ item, index }) =>         
                  <CardSuggestion item={item} index={index} set={this.set}/>
                }
              />
            </View>
        
          </KeyboardAwareScrollView>
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
    places_loaded: state.places.places_loaded,
    search_place:  state.places.search_place,
  }
}

export default connect(state => ( mapStateToProps), { getPlaces, setSearchPlace })(Search);