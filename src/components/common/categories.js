import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../colors';

const styles = StyleSheet.create({

  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: colors.badge,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  textBadge: {
    color: 'white',
    fontSize: 12,
  },

});

export default class Categories extends Component {
  render() {
    const { categories} = this.props;
    return (
       <View style={styles.labels}>
        { categories && categories.map( (category, i) =>
          <View  key={i} style={styles.badge}>
            <Text style={styles.textBadge}>{category.shortName}</Text>
          </View>
        )}
      </View>
    );
  }
}