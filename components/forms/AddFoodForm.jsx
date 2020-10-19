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

import Divider from '../layout/Divider.jsx';
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import ThemedInputContainer from '../layout/ThemedInputContainer.jsx';
import SubmitButton from "../inputs/SubmitButton";
import NumberInput from "../inputs/NumberInput";

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
            <NumberInput
                name='cal'
                ref={calInputRef}
                placeholder="Calories"
                value={fields.cal}
                myOnChangeText={onChangeText}
            />
            <NumberInput
                name='protein'
                ref={proteinInputRef}
                placeholder="Protein"
                value={fields.protein}
                myOnChangeText={onChangeText}
            />
            <Divider height={20} />
            <SubmitButton
                title="Log"
                onPress={onPressLog}
                isInactive={!isFormValid()}
            />
            <Divider height={20} />
            <SubmitButton
                title="Log And Save As A Prefab"
                onPress={onPressLogAndSaveAsPrefab}
                isInactive={!isFormValid()}
            />
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({ addFood, addPrefab }, dispatch),
    });
}

export default connect(undefined, mapDispatchToProps)(AddFoodForm);
