import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../colors';
import basicStyles from '../../styles/styles';

const styles = StyleSheet.create({

  containerAttribute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

});

export default class Attributes extends Component {
  render() {
    const { attributes} = this.props;

    return (

      <View>
        {attributes && attributes.groups.map((group, i) => 
          <View key={i} style={styles.containerAttribute}>
            <Text  style={[basicStyles.textNormal, basicStyles.textBold]}>{group.name}</Text>
              <View>
              {group.items.map((item, j) => 
                <Text key={j} style={basicStyles.textSmall}>{item.displayValue}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
