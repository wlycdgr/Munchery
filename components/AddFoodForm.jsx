import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import AddButton from './AddButton.jsx';
import Divider from './Divider.jsx';
import ThemedTextInput from "./ThemedTextInput.jsx";
import ThemedNumberInput from "./ThemedNumberInput.jsx";
import ThemedInputContainer from './ThemedInputContainer.jsx';

const AddFoodForm = (props) => {
    const { submit, submitLabel } = props;
    const [desc, setDesc] = useState('');
    const [cal, setCal] = useState('');
    const [isDescValid, setIsDescValid] = useState(true);
    const [isCalValid, setIsCalValid] = useState(true);

    const onLogFoodPress = () => {
        if (desc === '' || cal === '') {
            if (desc === '') {
                setIsDescValid(false);
            }
            if (cal === '') {
                setIsCalValid(false);
            }
            return;
        }

        setIsDescValid(true);
        setIsCalValid(true);

        submit(desc, cal);
    }

    const handleCancelPress = (e) => {
      const { cancel } = props;

      Keyboard.dismiss();

      cancel();
    }

    const handleDescOnChangeText = (text) => {
        if (text !== '' && !isDescValid) {
            setIsDescValid(true);
        }

        setDesc(text);
    }

    const handleCalOnChangeText = (text) => {
        if (text !== '' && !isCalValid) {
            setIsCalValid(true);
        }

        setCal(text);
    }

    return(
        <>
            <ThemedInputContainer>
                <AddButton
                    title="Cancel"
                    onPress={handleCancelPress}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <ThemedTextInput
                    placeholder="Description"
                    value={desc}
                    onChangeText={handleDescOnChangeText}
                    isError={!isDescValid}
                />
            </ThemedInputContainer>
            <ThemedInputContainer>
                <ThemedNumberInput
                    placeholder="Calorie"
                    value={cal}
                    onChangeText={handleCalOnChangeText}
                    isError={!isCalValid}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <AddButton
                    title={submitLabel || "Log Food"}
                    onPress={onLogFoodPress}
                />
            </ThemedInputContainer>
        </>
    );
}

export default AddFoodForm;
