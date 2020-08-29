import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from '../inputs/AddButton.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer.jsx";
import Divider from '../layout/Divider.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import AddDishForm from './AddDishForm.jsx';
import AddMealForm from './AddMealForm.jsx';

const styles = StyleSheet.create({
  foodInputControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const FoodInput = (props) => {
  const [isShowingForm, setIsShowingForm] = useState(false);
  const [formType, setFormType] = useState('');

  const handleAddFoodPress = () => {
    const { onActivateForm } = props;

    setFormType('food');
    setIsShowingForm(true);

    onActivateForm();
  }

  const handleAddDishPress = () => {
    setFormType('dish');
    setIsShowingForm(true);
  }

  const handleAddMealPress = () => {
    setFormType('meal');
    setIsShowingForm(true);
  }

  const hideForm = () => {
    setFormType('');
    setIsShowingForm(false);
  }

  const onCancelForm = () => hideForm();

  const onSubmitAddFoodForm = (food) => {
    const { onLogFood } = props;

    onLogFood(food);
    hideForm();
  }

  const logDish = (dish) => {
    const { onLogDish } = props;

    onLogDish(dish);
    hideForm();
  }

  const logMeal = (meal) => {
    const { onLogMeal } = props;

    onLogMeal(meal);
    hideForm();
  }

  const renderAddButtons = () => {
    return(
      <>
        <ThemedInputContainer>
          <AddButton
            title="Add Food"
            onPress={handleAddFoodPress}
          />
        </ThemedInputContainer>
        <Divider height={30} />
        <ThemedInputContainer>
          <AddButton
            title="Add Dish"
            onPress={handleAddDishPress}
          />
        </ThemedInputContainer>
        <Divider height={30} />
        <ThemedInputContainer>
          <AddButton
            title="Add Meal"
            onPress={handleAddMealPress}
          />
        </ThemedInputContainer>
      </>
    );
  }

  const renderForm = () => {
    return(
      <>
        {formType === 'food' &&
          <AddFoodForm
            onCancel={onCancelForm}
            onSubmit={onSubmitAddFoodForm}
          />
        }
        {formType === 'dish' &&
          <AddDishForm
            onCancel={onCancelForm}
            onSubmit={logDish}
          />
        }
        {formType === 'meal' &&
          <AddMealForm
            onCancel={onCancelForm}
            onSubmit={logMeal}
          />
        }
      </>
    );
  }

  return(
    <View style={styles.foodInputControls}>
      {!isShowingForm && renderAddButtons()}
      {isShowingForm && renderForm()}
    </View>
  );
}

export default FoodInput;