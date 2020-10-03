/*
Form for editing a food item
Calories are passed in as a number and sent out as a number,
but converted to a string internally for input handling purposes
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ThemedButton from '../inputs/ThemedButton.jsx';
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

const EditFoodForm = (props) => {
    const {
        ogCal,
        ogDesc,
    } = props;

    const [desc, setDesc] = useState(ogDesc || '');
    const [calStr, setCalStr] = useState(initCalStr(ogCal))
    const [isShowDescError, setIsShowDescError] = useState(false);
    const [isShowCalStrError, setIsShowCalStrError] = useState(false);

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

    const onPressSave = () => {
        const { id, onSubmit } = props;

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
            cal: parseInt(calStr, 10),
            desc,
            id,
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

    const onPressDelete = () => {
        const { id, onDelete } = props;

        onDelete(id);
    }

    return(
        <View
            style={styles.view}
        >
            <ThemedInputContainer>
                <ThemedButton
                    title="Delete"
                    type="highlight"
                    onPress={onPressDelete}
                />
            </ThemedInputContainer>
            <Divider height={20} />
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
                    value={calStr}
                    onChangeText={onChangeTextCal}
                    isShowError={isShowCalStrError}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <ThemedButton
                    title={"Save"}
                    onPress={onPressSave}
                    type="highlight"
                    isInactive={!isFormValid()}
                />
            </ThemedInputContainer>
        </View>
    );
}

export default EditFoodForm;
