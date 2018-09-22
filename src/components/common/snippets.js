import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';

export default class Snippets extends Component {
  render() {
    const { snippets} = this.props;
    return (
      <View>
        { snippets.count > 0 && snippets.items.map((snippet, i) =>
          snippet.detail !== undefined &&
          <View key={i}>
            <Text style={styles.textSmall}>{snippet.detail.object.text}</Text>
          </View>
        )}
      </View>
    );
  }
}