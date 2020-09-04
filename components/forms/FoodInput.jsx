import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from '../inputs/AddButton.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer.jsx";
import Divider from '../layout/Divider.jsx';
import FoodForm from './AddFoodForm.jsx';
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
    setFormType('food');
    setIsShowingForm(true);
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

  const onCancelForm = () => {
    const {onLayoutForm} = props;

    hideForm();
    onLayoutForm({nativeEvent: {layout: {x: 0, y: 0}}});
  }

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
    const { onLayoutForm } = props;

    return(
      <>
        {formType === 'food' &&
          <FoodForm
            ogCal={0}
            ogDesc=''
            onCancel={onCancelForm}
            onLayout={onLayoutForm}
            onSubmit={onSubmitAddFoodForm}
          />
        }
        {formType === 'dish' &&
          <AddDishForm
            onCancel={onCancelForm}
            onSubmit={logDish}
            onLayout={onLayoutForm}
          />
        }
        {formType === 'meal' &&
          <AddMealForm
            onCancel={onCancelForm}
            onSubmit={logMeal}
            onLayout={onLayoutForm}
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
