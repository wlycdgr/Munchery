// 3rd party libs
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { deleteFood, updateFood } from "../../store/actionCreators";

// Munchery components
import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import EditFoodForm from "../forms/EditFoodForm";
import FoodView from "../views/FoodView";


const styles = StyleSheet.create({
    mainContentContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },

    foodlogEntryContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

const EditScreen = (props) => {
    const { foods } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(0);

    const onCancelEdit = () => {
        setIsEditing(false);
    }

    const onDeleteFood = (id) => {
        const { actions } = props;
        const { deleteFood } = actions;

        deleteFood(id);
        setIsEditing(false);
    }

    const onPressFoodView = (id) => {
        setEditId(id);
        setIsEditing(true);
    }

    const onSaveEdit = (food) => {
        const { actions } = props;
        const { updateFood } = actions;

        updateFood(food);
        setIsEditing(false);
    }

    const renderAllFoods = () => {
        return(
            foods.map((food, index) => {
                const { cal, desc, id } = food;

                return (
                    <View key={index} style={styles.foodlogEntryContainer}>
                        <FoodView
                            cal={cal}
                            desc={desc}
                            id={id}
                            onPress={onPressFoodView}
                        />
                        <Divider height={20} />
                    </View>
                );
            })
        );
    }

    const renderFoodBeingEdited = () => {
        const food = foods.find(food => food.id === editId);
        const { id, cal, desc } = food;

        console.log(food);

        return (
            <EditFoodForm
                id={id}
                ogCal={cal}
                ogDesc={desc}
                onCancel={onCancelEdit}
                onDelete={onDeleteFood}
                onSubmit={onSaveEdit}
            />
        )
    }

    return(
        <View
            contentContainerStyle={styles.mainContentContainer}
            keyboardShouldPersistTaps='handled'
        >
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            {!isEditing && renderAllFoods()}
            {isEditing && renderFoodBeingEdited()}
            <Divider height={20} />
        </View>
    );
}

const mapStateToProps = (state) => {
    return ({
        foods: state.foods,
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({ deleteFood, updateFood }, dispatch)
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
