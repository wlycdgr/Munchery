import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
    base: {
        borderStyle: 'solid',
        borderColor: '#444444',
    },
    blurred: {
        borderBottomWidth: 1,
    },
    focused: {
        borderBottomWidth: 2,
    }
});

const blurred = StyleSheet.compose(styles.base, styles.blurred);
const focused = StyleSheet.compose(styles.base, styles.focused);

const ThemedNumberInput = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleOnFocus = () => {
        const { onFocus } = props;

        setIsFocused(true);

        if (onFocus) {
            onFocus();
        }
    }

    const handleOnBlur = () => {
        const { onBlur } = props;

        setIsFocused(false);

        if (onBlur) {
            onBlur();
        }
    }

    return(
        <TextInput
            {...props}
            keyboardType="number-pad"
            style={isFocused ? focused : blurred}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        />
    );
}

export default ThemedNumberInput;
