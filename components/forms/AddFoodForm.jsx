import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AddButton from '../inputs/AddButton.jsx';
import Divider from '../layout/Divider.jsx';
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import ThemedNumberInput from "../inputs/ThemedNumberInput.jsx";
import ThemedInputContainer from '../layout/ThemedInputContainer.jsx';

const styles = StyleSheet.create({
    view: {
        width: '100%',
        alignItems: 'center',
    }
});

const AddFoodForm = (props) => {
    const {
        onCancel,
        startingCal,
        startingDesc,
        submitLabel,
    } = props;

    const [desc, setDesc] = useState(startingDesc || '');
    const [cal, setCal] = useState(startingCal || '');
    const [isShowDescError, setIsShowDescError] = useState(false);
    const [isShowCalError, setIsShowCalError] = useState(false);

    const isFormValid = () => {
        return (isDescValid() && isCalValid());
    }

    // Not stored as state variables
    // because they can be derived from other state variables
    // (Unlike isShowDescError and isShowCalError, whose value
    // depends not only on the value of other state variables
    // but also on whether the user has just tried to submit)
    const isDescValid = () => (desc !== '');
    const isCalValid = () => (cal !== '');

    const onPressLogFood = () => {
        const { onSubmit } = props;

        if (!isFormValid()) {
            if (!isDescValid()) {
                setIsShowDescError(true);
            }
            if (!isCalValid()) {
                setIsShowCalError(true);
            }
            return;
        }

        setIsShowDescError(false);
        setIsShowCalError(false);

        onSubmit({
            desc,
            cal,
        });
    }

    const onChangeTextDesc = (descValue) => {
        if (descValue !== '' && isShowDescError) {
            setIsShowDescError(false);
        }

        setDesc(descValue);
    }

    const onChangeTextCal = (calValue) => {
        if (calValue !== '' && isShowCalError) {
            setIsShowCalError(false);
        }

        setCal(calValue);
    }

    const onLayout = (e) => {
        const { onLayout } = props;

        if (isLayoutReported) return;

        if (onLayout) {
            onLayout(e);
        }

        setIsLayoutReported(true);
    }

    return(
        <View
            style={styles.view}
            onLayout={onLayout}
        >
            <ThemedInputContainer>
                <ThemedTextInput
                    autoFocus={true}
                    placeholder="Food name"
                    value={desc}
                    onChangeText={onChangeTextDesc}
                    isShowError={isShowDescError}
                />
            </ThemedInputContainer>
            <ThemedInputContainer>
                <ThemedNumberInput
                    placeholder="Calories"
                    value={cal}
                    onChangeText={onChangeTextCal}
                    isShowError={isShowCalError}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <AddButton
                    title={submitLabel || "LOG"}
                    onPress={onPressLogFood}
                    type="highlight"
                    isInactive={!isFormValid()}
                />
            </ThemedInputContainer>
        </View>
    );
}

export default AddFoodForm;
