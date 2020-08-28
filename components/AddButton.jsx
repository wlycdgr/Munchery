import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC66CC',
    width: '100%',
    height: '100%',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'space-mono',
  },
});

const AddButton = (props) => {
  const { title, onPress } = props;

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.label}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

export default AddButton;
