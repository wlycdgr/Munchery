import React from 'react';
import ThemedTextInput from "./ThemedTextInput.jsx";

const ThemedNumberInput = (props) => {
    return(
        <ThemedTextInput
            {...props}
            keyboardType="number-pad"
        />
    );
}

export default ThemedNumberInput;
