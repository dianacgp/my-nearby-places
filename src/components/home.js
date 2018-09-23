import React, { Component } from 'react';
import { View, FlatList, Geolocation, TouchableOpacity, InteractionManager, Text, ScrollView } from 'react-native';
import { getSuggestions } from '../reducers/places/actions';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { Actions } from 'react-native-router-flux';
import colors from '../../colors'
import CardSuggestion from './common/cardSuggestion';
import OpenMap from './common/openMap';
import Message from './common/message';
import Modal from "react-native-simple-modal";
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

const suggestions = [
    {icon: 'cutlery', label: 'Food', value: 'food'},
    {icon: 'coffee', label: 'Coffees', value: 'coffee', type: "FontAwesome"},
    {icon: 'beer', label: 'Night', value: 'drinks', type: "FontAwesome"},
    {icon: 'ticket', label: 'Fun', value: 'arts', type: "FontAwesome"},
    {icon: 'shopping-cart', label: 'Shops', value: 'shops'},

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
    modalError: true,
    spinner: true,
  }


  componentDidMount(){

    this.setState({spinner: true});

    InteractionManager.runAfterInteractions(() => {  

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            //ll: '48.8583701,2.2922926',
            ll:  position.coords.latitude + ',' + position.coords.longitude,
            spinner: false,
          });
          this.searchSuggestions();
        },
        (error) => {

          this.setState({ error: error, modalError: true, spinner: false });
          Actions.location({error: error, modalError: this.state.modalError, reload: this.componentDidMount.bind(this)})
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
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
              <Icon  size={30} name={suggestion.icon} style={activeCategory === suggestion.value ? styles.iconSuggestionActive : styles.iconSuggestion} type={suggestion.type} />
              <Text style={activeCategory === suggestion.value ? styles.textSuggestionActive : styles.textSuggestion}>{suggestion.label}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
  renderSuggestionsSmall = () => {
    const { activeCategory } = this.state;

    return(
      <View style={styles.containerSuggestions}>
        {
          suggestions.map((suggestion, i) => 
            <TouchableOpacity key={i} style={activeCategory === suggestion.value ? styles.itemSuggestionActiveSmall : styles.itemSuggestionSmall}
              onPress={this.searchCategories.bind(this, suggestion.value)}
              >
              <Icon  size={20} name={suggestion.icon} style={activeCategory === suggestion.value ? styles.iconSuggestionActive : styles.iconSuggestion} type={suggestion.type} />
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
  renderFooter = () => {

    const { suggestions, suggestions_error, suggestions_loaded  } = this.props;

    return(
      <View>
        {
          suggestions_error ? 
            <Message error={true} reload={this.searchSuggestions}/>
        :
          suggestions.size === 0 && suggestions_loaded &&
            <Message message='We do not find results near you'/>
        }
      </View>
    )
  }
  closeModal = () => {
    this.setState({modalError:  false});
    Actions.location({error: this.state.error, modalError: this.state.modalError})
  }

  renderLoading = () => {

    return(
      <Spinner/>
    );
  }
  onMomentumScrollBegin = () => {
    console.log('onMomentumScrollBegin')
  }
  onScrollBeginDrag = () => {
    console.log('onScrollBeginDrag')
  }
  render() {
    const { suggestions,  suggestions_refreshing} = this.props;
    const { error, modalError } = this.state;

    return (
      <View>
        <View>
          <Spinner visible={this.state.spinner} />
        </View>
        <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
        {
          //this.renderSuggestions()
        }
        {
          this.renderSuggestionsSmall()
        }
        <View style={{minHeight: 500}}>
          <FlatList
            onScrollBeginDrag={this.onScrollBeginDrag}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter}
            refreshing={suggestions_refreshing}
            data = {suggestions.toJS()}
            onRefresh={this.searchSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {({ item, index }) =>         
              <CardSuggestion item={item} index={index} set={this.set}/>
            }
          />
        </View>
    
      </View>
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