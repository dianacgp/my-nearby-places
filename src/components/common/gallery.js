import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import Gallery from 'react-native-image-gallery';
import styles from '../../styles/styles';
import Spinner from './spinner';

export default class ModalGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }

  componentDidMount(){
    this.setState({spinner: true});
    InteractionManager.runAfterInteractions(() => {  
      this.setState({spinner: false});
    });
   
  }
  renderLoading = () => {

    return(
      <Spinner  style={styles.gallery}/>
    );
  }

  render() {
    const {i, photos} = this.props;
    if (this.state.spinner){
      return this.renderLoading();
    }
    return (

      <Gallery
        initialPage={i}
        style={styles.gallery}
        images={photos} 
      />


    );
  }
}