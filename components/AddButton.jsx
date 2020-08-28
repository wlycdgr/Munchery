import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC66CC',
    width: 200,
    height: 40,
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.label}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddButton;
