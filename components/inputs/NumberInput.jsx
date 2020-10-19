import React from "react";

import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedNumberInput from "./ThemedNumberInput";

const NumberInput = React.forwardRef((props, ref) => (
    <ThemedInputContainer>
        <ThemedNumberInput
            {...props}
            ref={ref}
            isShowError={false}
        />
    </ThemedInputContainer>
));

export default NumberInput;
