// React
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    instructions: {
        fontSize: 18,
    }
});

const EditPrefabsTab = (props) => {
    const { prefabs } = props;
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

    const onSaveEdit = (prefab) => {
        const { actions } = props;
        const { updatePrefab } = actions;

        updatePrefab(prefab);
        setIsEditing(false);
    }

    const renderInstructions = () => (
        <View style={styles.centeredView}>
            <Text style={styles.instructions}>Tap a prefab to EDIT it</Text>
        </View>
    )

    const renderPrefab = ({ item }) => {
        const { cal, desc, id } = item;

        return (
            <View key={id} style={styles.centeredView}>
                <FoodView
                    cal={cal}
                    desc={desc}
                    id={id}
                    onPress={onPressPrefabEdit}
                />
                <Divider height={20} />
            </View>
        );
    }

    const renderAllPrefabs = () => (
        <FlatList
            style={{ height: '60%' }}
            data={prefabs}
            renderItem={renderPrefab}
            keyExtractor={item => item.id}
        />
    );

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
            <Divider height={20} />
            {!isEditing && renderInstructions()}
            {!isEditing && <Divider height={20} />}
            {!isEditing && renderAllPrefabs()}
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
