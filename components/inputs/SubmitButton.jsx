import React from "react";
import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedButton from "./ThemedButton";

const SubmitButton = ({ title, onPress, isInactive = false }) => (
    <ThemedInputContainer>
        <ThemedButton
            title={title}
            onPress={onPress}
            type="highlight"
            isInactive={isInactive}
        />
    </ThemedInputContainer>
);

export default SubmitButton;
