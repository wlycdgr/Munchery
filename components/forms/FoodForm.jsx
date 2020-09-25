/*
Form for entering or editing a food item
Calories are passed in as a number and sent out as a number,
but converted to a string internally for input handling purposes
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions creators
import { deleteFood } from '../../store/actionCreators';

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
        isCanDelete,
        ogCal,
        ogDesc,
        submitLabel,
    } = props;

    const calInputRef = useRef(null);
    const descInputRef = useRef(null);
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
            desc,
            cal: parseInt(calStr, 10),
        });

        setDesc('');
        setCalStr('');

        calInputRef.current.blur();
        descInputRef.current.focus();
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

    const onDelete = () => {
        const { actions, id } = props;
        const { deleteFood } = actions;

        deleteFood(id);
    }

    return(
        <View
            style={styles.view}
        >
            {isCanDelete &&
                <>
                    <ThemedInputContainer>
                        <AddButton
                            title="Delete"
                            type="highlight"
                            onPress={onDelete}
                        />
                    </ThemedInputContainer>
                    <Divider height={20} />
                </>
            }
            <ThemedInputContainer>
                <ThemedTextInput
                    ref={descInputRef}
                    autoFocus={true}
                    placeholder="Food name"
                    value={desc}
                    onChangeText={onChangeTextDesc}
                    isShowError={isShowDescError}
                />
            </ThemedInputContainer>
            <ThemedInputContainer>
                <ThemedNumberInput
                    ref={calInputRef}
                    placeholder="Calories"
                    value={calStr}
                    onChangeText={onChangeTextCal}
                    isShowError={isShowCalStrError}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            <ThemedInputContainer>
                <AddButton
                    title={submitLabel || "Log"}
                    onPress={onPressLogFood}
                    type="highlight"
                    isInactive={!isFormValid()}
                />
            </ThemedInputContainer>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({ deleteFood }, dispatch)
    });
}

export default connect(undefined, mapDispatchToProps)(FoodForm);
