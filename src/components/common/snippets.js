import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import basicStyles from '../../styles/styles';
import colors from '../../../colors';
import ViewMoreText from './viewMore';
var I18n = require('../translations/i18n');

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.grayVeryLight,
  }

});

renderViewMore = (onPress) => {
    return(
      <Text style={basicStyles.textMoreLess} onPress={onPress}>{I18n.t('more')}</Text>
    );
  }
  renderViewLess = (onPress) => {
    return(
      <Text  style={basicStyles.textMoreLess} onPress={onPress}>{I18n.t('less')}</Text>
    );
  }

export default class Snippets extends Component {
  render() {
    const { snippets} = this.props;

    return (
      <View>
        { snippets.count > 0 && snippets.items.map((snippet, i) =>
          snippet.detail !== undefined &&
          <View key={i} style={styles.container}>
            <ViewMoreText
              numberOfLines={2}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess}
            >
               <Text style={basicStyles.textSmall}>{snippet.detail.object.text}</Text>
          </ViewMoreText>
           
          </View>
        )}
      </View>
    );
  }
}