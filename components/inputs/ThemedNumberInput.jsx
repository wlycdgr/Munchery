import React from 'react';
import ThemedTextInput from "./ThemedTextInput.jsx";

const ThemedNumberInput = React.forwardRef((props, ref) => (
    <ThemedTextInput
        {...props}
        ref={ref}
        keyboardType="number-pad"
    />
));

export default ThemedNumberInput;
