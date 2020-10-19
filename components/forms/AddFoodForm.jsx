/*
Form for logging a new food item
Calories are passed in as a number and sent out as a number,
but converted to a string internally for input handling purposes
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Action creators
import { addFood, addPrefab } from '../../store/actionCreators';

import ThemedButton from '../inputs/ThemedButton.jsx';
import Divider from '../layout/Divider.jsx';
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import ThemedNumberInput from "../inputs/ThemedNumberInput.jsx";
import ThemedInputContainer from '../layout/ThemedInputContainer.jsx';

import isPositiveInteger from "../../utils/isPositiveInteger";

const styles = StyleSheet.create({
    view: {
        width: '100%',
        alignItems: 'center',
    }
});

const AddFoodForm = (props) => {
    const calInputRef = useRef(null);
    const descInputRef = useRef(null);
    const proteinInputRef = useRef(null);
    const [fields, setFields] = useState ({ cal: '', desc: '', protein: '' });

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

    const onPressLog = (shouldAddPrefab = false) => {
        const { actions } = props;
        const { addFood, addPrefab } = actions;

        const newFood = {
            desc: fields.desc,
            cal: parseInt(fields.cal, 10),
            protein: parseInt(fields.protein, 10)
        };

        addFood(newFood);
        if (shouldAddPrefab) addPrefab(newFood);

        setFields({ cal: '', desc: '', protein: '' });

        calInputRef.current.blur();
        proteinInputRef.current.blur();
        descInputRef.current.focus();
    }

    const onPressLogAndSaveAsPrefab = () => onPressLog(true);

    const onChangeText = (newValue, fieldName = 'protein') => {
        setFields({...fields, [fieldName]: newValue })
    }

    const renderNumberInputField = (fieldName, fieldRef, placeholderText) => (
        <ThemedInputContainer>
            <ThemedNumberInput
                name={fieldName}
                ref={fieldRef}
                placeholder={placeholderText}
                value={fields[fieldName]}
                myOnChangeText={onChangeText}
                isShowError={false}
            />
        </ThemedInputContainer>
    );

    const renderSubmitButton = (buttonLabel, onPressHandler) => (
        <ThemedInputContainer>
            <ThemedButton
                title={buttonLabel}
                onPress={onPressHandler}
                type="highlight"
                isInactive={!isFormValid()}
            />
        </ThemedInputContainer>
    );

    return(
        <View
            style={styles.view}
        >
            <ThemedInputContainer>
                <ThemedTextInput
                    name='desc'
                    ref={descInputRef}
                    autoFocus={true}
                    placeholder="Food name"
                    value={fields.desc}
                    myOnChangeText={onChangeText}
                    isShowError={false}
                />
            </ThemedInputContainer>
            {renderNumberInputField('cal', calInputRef, 'Calories')}
            {renderNumberInputField('protein', proteinInputRef, 'Protein')}
            <Divider height={20} />
            {renderSubmitButton('Log', onPressLog)}
            <Divider height={20} />
            {renderSubmitButton('Log And Save As A Prefab', onPressLogAndSaveAsPrefab)}
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({ addFood, addPrefab }, dispatch),
    });
}

export default connect(undefined, mapDispatchToProps)(AddFoodForm);
