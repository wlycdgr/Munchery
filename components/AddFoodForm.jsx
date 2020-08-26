import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import AddButton from './AddButton.jsx';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  themedTextInput: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    height: 40,
  },
  themedNumberInput: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    height: 40,
  }
})

const AddFoodForm = (props) => {
  const { cancel, submit, submitLabel } = props;
  const [desc, setDesc] = useState('');
  const [cal, setCal] = useState('');

  const onLogFoodPress = () => {
    submit(desc, cal);
  }

  return(
    <View style={styles.container}>
      <AddButton
        title="Cancel"
        onPress={cancel}
      />
      <TextInput
        style={styles.themedTextInput}
        placeholder="Description"
        value={desc}
        onChangeText={text => setDesc(text)}
      />
      <TextInput
        style={styles.themedNumberInput}
        placeholder="Calorie"
        value={cal}
        onChangeText={text => setCal(text)}
        keyboardType="number-pad"
      />
      <AddButton
        title={submitLabel || "Log Food"}
        onPress={onLogFoodPress}
      />
    </View>
  );
}

export default AddFoodForm;
