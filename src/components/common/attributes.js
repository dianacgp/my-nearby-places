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

export default class Attributes extends Component {
  render() {
    const { attributes} = this.props;

    return (

      <View>
        {attributes && attributes.groups.map((group, i) => 
          <View key={i}>
            <Text>{group.name}</Text>
            {group.items.map((item, j) => 
              <Text key={j}>{item.displayValue}</Text>
            )}
          </View>
        )}
      </View>
    );
  }
}
