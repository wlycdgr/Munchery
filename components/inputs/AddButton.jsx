import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as colors from '../../constants/colors.js';

const label = StyleSheet.create({
  text: {
    color: colors.normalButtonText,
    fontWeight: 'bold',
    fontFamily: 'space-mono',
  },
});

const button = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activeHighlight: {
    backgroundColor: colors.highlight,
  },
  inactiveHighlight: {
    backgroundColor: colors.fadedHighlight,
  },
  activeNormal: {
    backgroundColor: colors.normalControl,
  },
  inactiveNormal : {
    backgroundColor: colors.fadedNormalControl,
  },
})

const activeNormal = StyleSheet.compose(button.base, button.activeNormal);
const inactiveNormal = StyleSheet.compose(button.base, button.inactiveNormal);

const activeHighlight = StyleSheet.compose(button.base, button.activeHighlight);
const inactiveHighlight = StyleSheet.compose(button.base, button.inactiveHighlight);

const AddButton = (props) => {
  const {
    isInactive,
    onPress,
    title,
    type,
  } = props;

  const buttonStyle = (type === 'highlight')
      ? (isInactive ? inactiveHighlight : activeHighlight)
      : (isInactive ? inactiveNormal : activeNormal);

  return (
    <>
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
      >
        <Text style={label.text}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

export default AddButton;
