import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import FoodView from './FoodView.jsx';
import FoodForm from '../forms/FoodForm.jsx';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const FoodContainer = (props) => {
    const {
        id,
        ogCal,
        ogDesc,
        ogMode,
        onDelete,
        onLayoutForm,
    } = props;

    const [isEditing, setIsEditing] = useState(ogMode === 'edit');
    const [cal, setCal] = useState(ogCal);
    const [desc, setDesc] = useState(ogDesc);

    const onCancelForm = () => {
        setIsEditing(false);
    }

    const onPressEdit = (e) => {
        // ? Do something with event object ?
        setIsEditing(true);
    }

    const onSubmitForm = (food) => {
        // TODO: Pass the change on to parent component, also
        const { cal, desc } = food;

        setCal(cal);
        setDesc(desc);
        setIsEditing(false);
    }

    return(
        <View style={styles.container}>
            {!isEditing &&
                <FoodView
                    cal={cal}
                    desc={desc}
                    id={id}
                    isEditable={true}
                    onPressEdit={onPressEdit}
                />
            }
            {isEditing &&
                <FoodForm
                    id={id}
                    ogCal={cal}
                    ogDesc={desc}
                    onCancel={onCancelForm}
                    onSubmit={onSubmitForm}
                    isCanDelete={true}
                    onDelete={onDelete}
                    submitLabel="Save"
                />
            }
        </View>
    );
}

export default FoodContainer;
