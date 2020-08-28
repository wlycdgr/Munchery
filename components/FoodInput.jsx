import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from './AddButton.jsx';
import ThemedInputContainer from "./ThemedInputContainer.jsx";
import Divider from './Divider.jsx';
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

  const handleCancelPress = () => {
      hideForm();
  }

  const logFood = (desc, cal) => {
    const { onLogFood } = props;

    const food = {
      desc,
      cal,
    };
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
            title="Log Food"
            onPress={handleAddFoodPress}
          />
        </ThemedInputContainer>
        <Divider height={30} />
        <ThemedInputContainer>
          <AddButton
            title="Log Dish"
            onPress={handleAddDishPress}
          />
        </ThemedInputContainer>
        <Divider height={30} />
        <ThemedInputContainer>
          <AddButton
            title="Log Meal"
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
            cancel={handleCancelPress}
            submit={logFood}
          />
        }
        {formType === 'dish' &&
          <AddDishForm
            cancel={handleCancelPress}
            submit={logDish}
          />
        }
        {formType === 'meal' &&
          <AddMealForm
            cancel={handleCancelPress}
            submit={logMeal}
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
