import React, { Component } from 'react';
import { View, FlatList, InteractionManager } from 'react-native';
import styles from '../../styles/styles';
import { Actions } from 'react-native-router-flux';
import colors from '../../../colors'
import CardPlace from '../common/cardPlace';
import OpenMap from '../common/openMap';
import Message from '../common/message';
import Spinner from '../common/spinner';

export default class ViewSuggestions extends Component {

  state = {
    openMap: false,
    place: null,
  }


  componentDidMount(){

    InteractionManager.runAfterInteractions(() => {  
      this.searchSuggestions();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      openMap: false,
       
    };
  }

  set = (state) => {
    this.setState(state)
  }

  setOpenMap = (value) => {
    this.setState({openMap: value}) 
  }

  searchSuggestions = () => {
    const { section } = this.props;

    const data = {section: section, ll: this.props.ll };

    this.props.getSuggestions(section, data)
    .catch((e) => {
      this.setState({
        error: true,
      });
    });
  }

  renderFooter = () => {

    const { suggestions, suggestions_error, suggestions_loaded, section  } = this.props;

    return(
      <View>
        {
          suggestions_error ? 
            <Message error={true} reload={this.searchSuggestions}/>
        :
          suggestions.size === 0 && suggestions_loaded &&
            <Message message={'we did not find results for ' + section}/>
        }
      </View>
    )
  }

  render() {
    const { suggestions,  refreshing} = this.props;

    return (
      <View style={styles.flex}>
        <OpenMap open={this.state.openMap} place={this.state.place} setOpenMap={this.setOpenMap}/>
        <FlatList
          style={styles.containerListHome}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={this.renderFooter}
          refreshing={refreshing}
          data = {suggestions.toJS()}
          onRefresh={this.searchSuggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({ item, index }) =>         
            <CardPlace item={item} index={index} set={this.set}/>
          }
      />  
      </View>
    );
  }
}