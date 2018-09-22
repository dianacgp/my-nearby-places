import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import basicStyles from '../../styles/styles';
import colors from '../../../colors';

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.grayVeryLight,
  }

});

export default class Snippets extends Component {
  render() {
    const { snippets} = this.props;
    console.log()
    return (
      <View>
        { snippets.count > 0 && snippets.items.map((snippet, i) =>
          snippet.detail !== undefined &&
          <View key={i} style={styles.container}>
            <Text style={basicStyles.textSmall}>{snippet.detail.object.text}</Text>
          </View>
        )}
      </View>
    );
  }
}