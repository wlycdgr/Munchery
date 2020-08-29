import React, { useState } from 'react';

import AddButton from '../inputs/AddButton.jsx';
import Divider from '../layout/Divider.jsx';
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import ThemedNumberInput from "../inputs/ThemedNumberInput.jsx";
import ThemedInputContainer from '../layout/ThemedInputContainer.jsx';

const AddFoodForm = (props) => {
    const { onCancel, submitLabel } = props;

    const [desc, setDesc] = useState('');
    const [cal, setCal] = useState('');
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
            type: 'food',
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

    return(
        <>
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
                    value={cal}
                    onChangeText={onChangeTextCal}
                    isShowError={isShowCalError}
                />
            </ThemedInputContainer>
            <Divider height={20} />
            {/*{isFormValid() &&*/}
                <ThemedInputContainer>
                    <AddButton
                        title={submitLabel || "LOG"}
                        onPress={onPressLogFood}
                        type="highlight"
                    />
                </ThemedInputContainer>
            {/*}*/}
        </>
    );
}

export default AddFoodForm;
