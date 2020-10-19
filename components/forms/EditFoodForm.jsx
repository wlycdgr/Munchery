/*
Form for editing a food item
Calories are passed in as a number and sent out as a number,
but converted to a string internally for input handling purposes
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
;
import Divider from '../layout/Divider.jsx';
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import SubmitButton from "../inputs/SubmitButton";
import ThemedInputContainer from '../layout/ThemedInputContainer.jsx';
import isPositiveInteger from "../../utils/isPositiveInteger";
import numToStr from "../../utils/numToStr";
import NumberInput from "../inputs/NumberInput";

const styles = StyleSheet.create({
    view: {
        width: '100%',
        alignItems: 'center',
    }
});

const EditFoodForm = (props) => {
    const {
        ogCal,
        ogDesc,
        ogProtein,
        onCancel,
    } = props;

    const [fields, setFields] = useState({ desc: ogDesc || '', cal: numToStr(ogCal), protein: numToStr(ogProtein)});

    const isFormValid = () => {
        return (isDescValid() && isCalStrValid() && isProteinStrValid());
    }

    // Not stored as state variables
    // because they can be derived from other state variables
    // (Unlike isShowDescError and isShowCalStrError, whose value
    // depends not only on the value of other state variables
    // but also on whether the user has just tried to submit)
    const isDescValid = () => fields.desc !== '';
    const isCalStrValid = () => isPositiveInteger(fields.cal);
    const isProteinStrValid = () => isPositiveInteger(fields.protein);

    const onPressSave = () => {
        const { id, onSubmit } = props;

        const updatedFood = {
            cal: parseInt(fields.cal, 10),
            protein: parseInt(fields.protein, 10),
            desc: fields.desc,
            id,
        };

        onSubmit(updatedFood);
    }

    const onChangeText = (newValue, fieldName = 'protein') => {
        setFields({...fields, [fieldName]: newValue })
    }

    const onPressDelete = () => {
        const { id, onDelete } = props;

        onDelete(id);
    }

    return(
        <View
            style={styles.view}
        >
            <SubmitButton
                title="Delete"
                onPress={onPressDelete}
            />
            <Divider height={20} />
            <ThemedInputContainer>
                <ThemedTextInput
                    name='desc'
                    autoFocus={true}
                    placeholder="Food name"
                    value={fields.desc}
                    myOnChangeText={onChangeText}
                    isShowError={false}
                />
            </ThemedInputContainer>
            <NumberInput
                name='cal'
                placeholder="Calories"
                value={fields.cal}
                myOnChangeText={onChangeText}
            />
            <NumberInput
                name='protein'
                placeholder="Protein"
                value={fields.protein}
                myOnChangeText={onChangeText}
            />
            <Divider height={20} />
            <SubmitButton
                title="Cancel"
                onPress={onCancel}
            />
            <Divider height={20} />
            <SubmitButton
                title="Save"
                onPress={onPressSave}
                isInactive={!isFormValid()}
            />
        </View>
    );
}

export default EditFoodForm;
