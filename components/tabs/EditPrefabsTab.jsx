// React
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { addFood, deletePrefab, updatePrefab } from "../../store/actionCreators";

// Munchery
import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import EditFoodForm from "../forms/EditFoodForm";
import FoodView from "../views/FoodView";
import MainContentContainer from "../views/MainContentContainer";
import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedButton from "../inputs/ThemedButton";

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const LOG_MODE = 1;
const EDIT_MODE = 2;

const EditPrefabsTab = (props) => {
    const { prefabs } = props;
    const [mode, setMode] = useState(LOG_MODE);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(0);

    const onCancelEdit = () => {
        setIsEditing(false);
    }

    const onDeletePrefab = (id) => {
        const { actions } = props;
        const { deletePrefab } = actions;

        deletePrefab(id);
        setIsEditing(false);
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
        const { actions } = props;
        const { updatePrefab } = actions;

        updatePrefab(prefab);
        setIsEditing(false);
    }

    const onPressModeSwitchButton = () => setMode(mode === LOG_MODE ? EDIT_MODE : LOG_MODE);

    const renderModeSwitchButton = mode => {
        const label = (mode === EDIT_MODE) ? 'Switch to Log Mode' : 'Switch to Edit Mode';

        return (
            <View style={styles.centeredView}>
                <ThemedInputContainer>
                    <ThemedButton
                        title={label}
                        onPress={onPressModeSwitchButton}
                        type="highlight"
                        isInactive={false}
                    />
                </ThemedInputContainer>
            </View>
        );
    }

    const renderModeHeader = mode => {
        const header = (mode === EDIT_MODE) ? 'Edit Mode' : 'Log Mode';
        const instructions = (mode === EDIT_MODE) ? 'Tap prefab to edit it' : 'Tap prefab to log it';

        return (
            <View style={styles.centeredView}>
                <Text style={{fontSize: 24, fontWeight: 'bold'} }>{header}</Text>
                <Text>{instructions}</Text>
            </View>
        );
    }

    const renderAllPrefabs = () => {
        const onPressHandler = (mode === EDIT_MODE) ? onPressPrefabEdit : onPressPrefabLog;

        return(
            prefabs.map((prefab) => {
                const { cal, desc, id } = prefab;

                return (
                    <View key={id} style={styles.centeredView}>
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
            {!isEditing && renderModeHeader(mode)}
            {!isEditing && <Divider height={20} />}
            {!isEditing && renderModeSwitchButton(mode)}
            {!isEditing && <Divider height={20} />}
            {!isEditing && renderAllPrefabs(mode)}
            {isEditing && renderPrefabBeingEdited()}
            <Divider height={20} />
        </MainContentContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        prefabs: state.prefabs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addFood,
            deletePrefab,
            updatePrefab
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPrefabsTab);
