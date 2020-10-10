// React
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { addFood } from "../../store/actionCreators";

// Munchery
import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import EditFoodForm from "../forms/EditFoodForm";
import FoodView from "../views/FoodView";
import MainContentContainer from "../views/MainContentContainer";
import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedButton from "../inputs/ThemedButton";

const styles = StyleSheet.create({
    prefabView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const prefabs = [
    {
        id: 1,
        desc: 'Soylent',
        cal: 400,
    },
    {
        id: 2,
        desc: 'Cheese ramen',
        cal: 550,
    },
    {
        id: 3,
        desc: 'Peanut butter & banana sandwich',
        cal: 600,
    }
];

const LOG_MODE = 1;
const EDIT_MODE = 2;

const PrefabTab = (props) => {
    const [mode, setMode] = useState(LOG_MODE);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(0);

    const onCancelEdit = () => {
        setIsEditing(false);
    }

    const onDeletePrefab = (id) => {
        // const { actions } = props;
        // const { deletePrefab } = actions;
        //
        // deletePrefab(id);
        // setIsEditing(false);
    }

    const onPressPrefabEdit = (id) => {
        setEditId(id);
        setIsEditing(true);
    }

    const onPressPrefabLog = (id) => {
        const { actions } = props;
        const { addFood } = actions;

        const prefab = prefabs.find(prefab => prefab.id === id);

        addFood({ desc: prefab.desc, cal: prefab.cal });
    }

    const onSaveEdit = (prefab) => {
        // const { actions } = props;
        // const { updatePrefab } = actions;
        //
        // updatePrefab(prefab);
        // setIsEditing(false);
    }

    const onPressModeSwitchButton = () => setMode(mode === LOG_MODE ? EDIT_MODE : LOG_MODE);

    const renderModeSwitchButton = mode => {
        const label = (mode === EDIT_MODE) ? 'Switch to Log Mode' : 'Switch to Edit Mode';

        return (
            <ThemedInputContainer>
                <ThemedButton
                    title={label}
                    onPress={onPressModeSwitchButton}
                    type="highlight"
                    isInactive={false}
                />
            </ThemedInputContainer>
        );
    }

    const renderModeHeader = mode => {
        const text = (mode === EDIT_MODE) ? 'Tap prefab to edit it' : 'Tap prefab to log it';

        return (<Text>{text}</Text>);
    }

    const renderAllPrefabs = () => {
        const onPressHandler = (mode === EDIT_MODE) ? onPressPrefabEdit : onPressPrefabLog;

        return(
            prefabs.map((prefab) => {
                const { cal, desc, id } = prefab;

                return (
                    <View key={id} style={styles.prefabView}>
                        <FoodView
                            cal={cal}
                            desc={desc}
                            id={id}
                            onPress={onPressHandler}
                        />
                        <Divider height={20} />
                    </View>
                );
            })
        );
    }

    const renderPrefabBeingEdited = () => {
        const prefab = prefabs.find(prefab => prefab.id === editId);
        const { id, cal, desc } = prefab;

        return (
            <EditFoodForm
                id={id}
                ogCal={cal}
                ogDesc={desc}
                onCancel={onCancelEdit}
                onDelete={onDeletePrefab}
                onSubmit={onSaveEdit}
            />
        )
    }

    return(
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            {!isEditing && renderModeSwitchButton(mode)}
            {!isEditing && renderModeHeader(mode)}
            {!isEditing && renderAllPrefabs(mode)}
            {isEditing && renderPrefabBeingEdited()}
            <Divider height={20} />
        </MainContentContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ addFood}, dispatch),
    }
}

export default connect(undefined, mapDispatchToProps)(PrefabTab);
