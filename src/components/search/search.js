import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, InteractionManager, Text } from 'react-native';
import { getPlaces, setSearchPlace, setErrorLocation, getAutocomplete } from '../../reducers/places/actions';
import { connect } from 'react-redux';
import basicStyles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../colors'
import CardPlace from '../common/cardPlace';
import CardAutocomplete from './cardAutocomplete';
import SearchBar from '../common/searchBar';
import OpenMap from '../common/openMap';
import Filters from './filters';
import Message from '../common/message';
import Sort from './sort';
import Modal from "react-native-simple-modal";
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const dismissKeyboard = require('dismissKeyboard');
import { Constants, Location, Permissions } from 'expo';
var I18n = require('../translations/i18n');

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      places: [],
      latitude: null,
      longitude: null,
      ll: '',
      errorMessage: null,
      searchTerm: this.props.search_place,
      openMap: false,
      place: null,
      showSort: false,
      showFilters: false, 
      filters: new Map(),
      error: false,
    };
  }

  componentDidMount(){

    InteractionManager.runAfterInteractions(() => {  
      this.getLocationAsync();
    });
  }
  getLocationAsync =  () => {

    let _this = this;

    Permissions.askAsync(Permissions.LOCATION)
    .then((response) => {

      if( response.status !== 'granted'){
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
      Location.getCurrentPositionAsync({})
      .then((location) => {
        this.setState({
          errorMessage: null,
          ll:  location.coords.latitude + ',' + location.coords.longitude,
          spinner: false,
        });
        this.props.setErrorLocation(false);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error,
          spinner: false
        });
        this.props.setErrorLocation(true);
      })
    })
    .catch((error) => {
      this.props.setErrorLocation(true);
      this.setState({
        errorMessage: error,
        spinner: false
      });
    });
  }
    
   

  getPlaces = (data) => {
    this.props.getPlaces(data)
    .catch((e) => {
      this.setState({
        error: true,
      });
    })
  }
  setOpenMap = (value) => {
    this.setState({ openMap: value });
  }
  
  onChangeText = (text) => {
    const { ll } = this.state;
    if (text.trim.length === 0 ) {
      this.props.setSearchPlace(text);
    }
    this.setState({
      searchTerm: text,
    });
    this.props.getAutocomplete(ll, text)
    .catch((error) => {
      this.setState({
        error: true,
      });
    })


  }
  searchPlaces = ( searchTerm  ) => {

    dismissKeyboard();
    const { ll } = this.state;

    const data = {query: searchTerm, ll: ll, filters: this.getFilters() };
    this.props.setSearchPlace(searchTerm);
    this.props.getPlaces(data)
    .catch((e) => {
      this.setState({
        error: true,
      });
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
        route='search'
        showButton={true}
        refreshing={this.props.places_refreshing}
        TextInput={{
          onChangeText: this.onChangeText, 
          placeholder: I18n.t('whatAreLooking'),
          value: this.state.searchTerm,
          autoFocus: false,
        }}
        Button={{
          disabled: this.state.searchTerm.trim().length === 0 ? true : false,
          onPress: this.searchPlaces.bind(this, this.state.searchTerm)
        }}
      />
    )
  }
  renderFooter = () => {

    const { places, places_error, places_loaded } = this.props;

    return(
      <View>
        {
          places_error ? 
            <Message error={true} reload={this.searchPlaces.bind(this, this.state.searchTerm)}/>
        :
          places.size === 0 && places_loaded &&
            <Message message={I18n.t('noResults')}/>
        }
      </View>
    )
  }
  renderFooterAutocomplete = () => {

    const { autocomplete, autocomplete_error, autocomplete_loaded  } = this.props;

    return(
      <View>
        {
          autocomplete_error ? 
            <Message error={true} reload={this.searchPlaces.bind(this, this.state.searchTerm)}/>
        :
          autocomplete.size === 0 && autocomplete_loaded &&
            <Message message={I18n.t('quickSuggestions')}/>
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
          <Icon name="sort" size={25} color={colors.principal} style={styles.iconSort}/>
          <Icon name="list" size={25} color={colors.principal} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.setModalFilters.bind(this, !this.state.showFilters)}
          >
          <Icon name="filter" size={25} color={ filters.size > 0 ?  colors.principal : colors.grayMedium} />
        </TouchableOpacity>
      </View>
    );
  }
  renderHeaderAutocomplete = () => {
    return <Text style={[basicStyles.textNormal, basicStyles.textCenter, basicStyles.bold, ]}>{I18n.t('quickSuggestions')}</Text>
  }

  render() {
    const { places,  places_refreshing, error_location, autocomplete, autocomplete_refreshing} = this.props;
    const { filters, showFilters, errorMessage, searchTerm } = this.state;


    if (this.state.showFilters){
      return(
        <Modal 
          closeOnTouchOutside={false}
          open={this.state.showFilters}
          style={{flex: 1}}
        > 
          <Filters set={this.set} filters={filters} searchPlaces={this.searchPlaces.bind(this, this.state.searchTerm)}/>
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
              <Sort set={this.set} filters={filters} searchPlaces={this.searchPlaces.bind(this, this.state.searchTerm)}/>
            </Modal>

          )
        }else{
        return (
          <View style={basicStyles.flex}>
            {errorMessage !== null &&
              <View style={[basicStyles.flex, basicStyles.center]}>
                <Message 
                  messageError={errorMessage.toString()} 
                  textReload={I18n.t('tryAgain')} 
                  error={true}
                  reload={this.componentDidMount.bind(this)}
                />
              </View>
            }

            <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
            { errorMessage === null && this.renderTitle()}
            { errorMessage === null && this.renderHeader()}
            { errorMessage === null && this.renderFooter()}
            { errorMessage === null &&  autocomplete.size > 0 && this.renderHeaderAutocomplete()}
           
           
            <KeyboardAwareScrollView
              ref='scroll'
              enableOnAndroid={true} 
              keyboardShouldPersistTaps="always"
              extraHeight={125}
              showsVerticalScrollIndicator={false}
            >
  
              {errorMessage === null && autocomplete.size === 0 ?
                <View style={basicStyles.minContainerList}>
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    //ListHeaderComponent={this.renderHeaderAutocomplete}
                    refreshing={places_refreshing}
                    data = {places.toJS()}
                    onRefresh={this.searchPlaces.bind(this, this.state.searchTerm)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({ item, index }) =>         
                      <CardPlace item={item} index={index} set={this.set}/>
                    }
                  />
                </View>
                : errorMessage === null && 
                <View style={basicStyles.minContainerList}>
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooterAutocomplete}
                    refreshing={autocomplete_refreshing}
                    data = {autocomplete.toJS()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({ item, index }) =>         
                      <CardAutocomplete item={item} index={index} searchPlaces={this.searchPlaces} set={this.set}/>
                    }
                    />
                  </View>
                }
      
            </KeyboardAwareScrollView>
          </View>
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
    error_location: state.places.error_location,
    autocomplete: state.places.autocomplete,
    autocomplete_refreshing: state.places.autocomplete_refreshing,
    autocomplete_error: state.places.autocomplete_error,
    autocomplete_loaded: state.places.autocomplete_loaded,
  }
}

export default connect(state => ( mapStateToProps), { getPlaces, setSearchPlace, setErrorLocation, getAutocomplete })(Search);