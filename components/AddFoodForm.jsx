import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import AddButton from './AddButton.jsx';
import ThemedTextInput from "./ThemedTextInput.jsx";
import ThemedNumberInput from "./ThemedNumberInput.jsx";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: 200,
        height: 40,
    },
})

const AddFoodForm = (props) => {
  const { submit, submitLabel } = props;
  const [desc, setDesc] = useState('');
  const [cal, setCal] = useState('');

  const onLogFoodPress = () => {
    submit(desc, cal);
  }

  const handleCancelPress = (e) => {
      const { cancel } = props;

      Keyboard.dismiss();

      cancel();
  }

  return(
    <View style={styles.container}>
        <AddButton
            title="Cancel"
            onPress={handleCancelPress}
    />
    <View style={styles.inputContainer}>
        <ThemedTextInput
            placeholder="Description"
            value={desc}
            onChangeText={text => setDesc(text)}
        />
    </View>
    <View style={styles.inputContainer}>
        <ThemedNumberInput
            placeholder="Calorie"
            value={cal}
            onChangeText={text => setCal(text)}
        />
    </View>
        <AddButton
            title={submitLabel || "Log Food"}
            onPress={onLogFoodPress}
        />
    </View>
  );
}

export default AddFoodForm;
