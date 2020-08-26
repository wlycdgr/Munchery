import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from './AddButton.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import AddDishForm from './AddDishForm.jsx';
import AddMealForm from './AddMealForm.jsx';

const styles = StyleSheet.create({
  foodInput: {
    marginBottom: 50,
  },
  foodInputControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
        <AddButton
          title="Log Food"
          onPress={handleAddFoodPress}
        />
        <AddButton
          title="Log Dish"
          onPress={handleAddDishPress}
        />
        <AddButton
          title="Log Meal"
          onPress={handleAddMealPress}
        />
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
    <View style={styles.foodInput}>
      <View style={styles.foodInputControls}>
        {!isShowingForm && renderAddButtons()}
        {isShowingForm && renderForm()}
      </View>
    </View>
  );
}

export default FoodInput;