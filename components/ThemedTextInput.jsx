import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
    base: {
        borderStyle: 'solid',
    },
    noError: {
        borderColor: '#444444',
    },
    error: {
        borderColor: 'red',
    },
    blurred: {
        borderBottomWidth: 1,
    },
    focused: {
        borderBottomWidth: 2,
    },
});

const blurred = StyleSheet.compose(
    StyleSheet.compose(styles.base, styles.noError),
    styles.blurred
);
const focused = StyleSheet.compose(
    StyleSheet.compose(styles.base, styles.noError),
    styles.focused
);
const errorBlurred = StyleSheet.compose(
    StyleSheet.compose(styles.base, styles.error),
    styles.blurred
);
const errorFocused = StyleSheet.compose(
    StyleSheet.compose(styles.base, styles.error),
    styles.focused
);

const ThemedTextInput = (props) => {
    const { isError } = props;

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

    const currentStyle = isError ? (isFocused ? errorFocused : errorBlurred) : (isFocused ? focused : blurred);

    return(
        <TextInput
            {...props}
            style={currentStyle}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        />
    );
}

export default ThemedTextInput;
