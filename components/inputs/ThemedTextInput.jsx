import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';

import * as colors from '../../constants/colors.js';

const styles = StyleSheet.create({
    base: {
        borderStyle: 'solid',
    },
    noError: {
        borderColor: colors.darkGray,
    },
    error: {
        borderColor: colors.fadedHighlight,
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

const ThemedTextInput = React.forwardRef((props, ref) => {
    const { isShowError } = props;

    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => {
        const { onFocus } = props;

        setIsFocused(true);

        if (onFocus) {
            onFocus();
        }
    }

    const onBlur = () => {
        const { onBlur } = props;

        setIsFocused(false);

        if (onBlur) {
            onBlur();
        }
    }

    const currentStyle = isShowError
        ? (isFocused ? errorFocused : errorBlurred)
        : (isFocused ? focused : blurred);

    return(
        <TextInput
            {...props}
            ref={ref}
            style={currentStyle}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
});

export default ThemedTextInput;
