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
import { addFood } from '../../store/actionCreators';

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

const AddFoodForm = (props) => {
    const calInputRef = useRef(null);
    const descInputRef = useRef(null);
    const [desc, setDesc] = useState('');
    const [calStr, setCalStr] = useState('');
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

    const onPressLog = () => {
        const { actions } = props;
        const { addFood } = actions;

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

        addFood( { desc, cal: parseInt(calStr, 10), });

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

    return(
        <View
            style={styles.view}
        >
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
                <ThemedButton
                    title="Log"
                    onPress={onPressLog}
                    type="highlight"
                    isInactive={!isFormValid()}
                />
            </ThemedInputContainer>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({ addFood }, dispatch),
    });
}

export default connect(undefined, mapDispatchToProps)(AddFoodForm);
