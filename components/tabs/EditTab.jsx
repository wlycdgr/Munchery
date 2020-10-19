// 3rd party libs
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { deleteFood, updateFood } from "../../store/actionCreators";

// Munchery components
import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import EditFoodForm from "../forms/EditFoodForm";
import FoodView from "../views/FoodView";
import MainContentContainer from "../views/MainContentContainer";

const styles = StyleSheet.create({
    foodView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const EditTab = (props) => {
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
        console.log('onPressFoodView id: ', id);

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
                const {
                    cal,
                    desc,
                    id,
                    protein } = food;

                return (
                    <View key={index} style={styles.foodView}>
                        <FoodView
                            cal={cal}
                            desc={desc}
                            id={id}
                            onPress={onPressFoodView}
                            protein={protein}
                        />
                        <Divider height={20} />
                    </View>
                );
            })
        );
    }

    const renderFoodBeingEdited = () => {
        const food = foods.find(food => food.id === editId);
        const { id, cal, desc, protein } = food;

        console.log(food);

        return (
            <EditFoodForm
                id={id}
                ogCal={cal}
                ogDesc={desc}
                ogProtein={protein}
                onCancel={onCancelEdit}
                onDelete={onDeleteFood}
                onSubmit={onSaveEdit}
            />
        )
    }

    return(
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            {!isEditing && renderAllFoods()}
            {isEditing && renderFoodBeingEdited()}
            <Divider height={20} />
        </MainContentContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTab);
