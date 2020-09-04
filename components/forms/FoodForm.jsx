/*
Form for entering or editing a food item
Calories are passed in as a number and sent out as a number,
but converted to a string internally for input handling purposes
 */

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

const initCalStr = (ogCal) => {
    if (ogCal && ogCal > 0) {
        return ogCal.toString();
    } else {
        return '';
    }
}

const FoodForm = (props) => {
    const {
        onCancel,
        ogCal,
        ogDesc,
        submitLabel,
    } = props;

    const [desc, setDesc] = useState(ogDesc || '');
    const [calStr, setCalStr] = useState(initCalStr(ogCal))
    const [isShowDescError, setIsShowDescError] = useState(false);
    const [isShowCalStrError, setIsShowCalStrError] = useState(false);
    const [isLayoutReported, setIsLayoutReported] = useState(false);

    const isFormValid = () => {
        return (isDescValid() && isCalStrValid());
    }

    // Not stored as state variables
    // because they can be derived from other state variables
    // (Unlike isShowDescError and isShowCalStrError, whose value
    // depends not only on the value of other state variables
    // but also on whether the user has just tried to submit)
    const isDescValid = () => (desc !== '');
    const isCalStrValid = () => (calStr !== '');

    const onPressLogFood = () => {
        const { onSubmit } = props;

        if (!isFormValid()) {
            if (!isDescValid()) {
                setIsShowDescError(true);
            }
            if (!isCalStrValid()) {
                setIsShowCalStrError(true);
            }
            return;
        }

        setIsShowDescError(false);
        setIsShowCalStrError(false);

        onSubmit({
            type: 'food',
            desc,
            cal: parseInt(calStr, 10),
        });
    }

    const onChangeTextDesc = (descValue) => {
        if (descValue !== '' && isShowDescError) {
            setIsShowDescError(false);
        }

        setDesc(descValue);
    }

    const onChangeTextCal = (calStr) => {
        if (calStr !== '' && isShowCalStrError) {
            setIsShowCalStrError(false);
        }

        setCalStr(calStr);
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
                <AddButton
                    title="Cancel"
                    onPress={onCancel}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <ThemedTextInput
                    autoFocus={true}
                    placeholder="Description"
                    value={desc}
                    onChangeText={onChangeTextDesc}
                    isShowError={isShowDescError}
                />
            </ThemedInputContainer>
            <ThemedInputContainer>
                <ThemedNumberInput
                    placeholder="Calorie"
                    value={calStr}
                    onChangeText={onChangeTextCal}
                    isShowError={isShowCalStrError}
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

export default FoodForm;
