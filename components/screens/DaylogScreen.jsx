import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CalorieSummary from '../views/CalorieSummary.jsx';
import FoodInput from '../forms/FoodInput.jsx';
import FoodItem from '../views/FoodItem.jsx';
import Dish from '../views/Dish.jsx';
import Meal from '../views/Meal.jsx';
import CalorieRangeTargetForm from '../forms/CalorieRangeTargetForm.jsx';
import AddButton from '../inputs/AddButton.jsx';
import Divider from '../layout/Divider.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer";

const styles = StyleSheet.create({
  mainContentContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  foodlogEntryContainer: {
    marginBottom: 20,
  },
});

const calReduce = (acc, obj) => {
    if (obj.cal) { return acc + parseInt(obj.cal, 10); }

    if (obj.type === 'dish') {
      return obj.ingredients.reduce((sum, ing) => calReduce(sum, ing), acc);
    }

    if (obj.type === 'meal') {
      return obj.items.reduce((sum, item) => calReduce(sum, item), acc);
    }
}

const calculateTotalCalories = (foodItems) => {
  return (foodItems.reduce((acc, item) => {
    return calReduce(acc, item);
  }, 0));
}

const DaylogScreen = () => {
  const [foodItems, setFoodItems] = useState([
    {
      type: 'food',
      desc: 'Soylent',
      cal: 400,
    },

    {
      type: 'dish',
      name: 'Fettucine Alfredo',
      ingredients: [
        { type: 'food', desc: 'Fettucine', cal: 300 },
        { type: 'food', desc: 'Alfredo Sauce', cal: 600 },
      ],
    },

    {
      type: 'meal',
      name: 'Breakfast',
      items: [
        {
          type: 'dish',
          name: 'Cheese Omelette',
          ingredients: [
            { type: 'food', desc: 'Eggs', cal: 140 },
            { type: 'food', desc: 'Cheddar', cal: 100 },
          ],
        },
        {
          type: 'food',
          desc: 'Banana',
          cal: 60,
        },
      ],
    }
  ]);
  const [totalCalories, setTotalCalories] = useState(calculateTotalCalories(foodItems));
  const [calorieTargetRangeLowerBound, setCalorieTargetRangeLowerBound] = useState(1800);
  const [calorieTargetRangeUpperBound, setCalorieTargetRangeUpperBound] = useState(2400);
  const scrollViewRef = useRef();

  const addFood = (food) => {
    setFoodItems([...foodItems, food]);
    setTotalCalories(totalCalories + calReduce(0, food));
  }

  const addDish = (dish) => {
    setFoodItems([...foodItems, dish]);
    setTotalCalories(totalCalories + calReduce(0, dish));
  }

  const addMeal = (meal) => {
    setFoodItems([...foodItems, meal]);
    setTotalCalories(totalCalories + calReduce(0, meal));
  }

  const handleNewDayPress = () => {
    setFoodItems([]);
    setTotalCalories(0);
  }

  const onSubmitCalorieRangeTargetForm = (lower, upper) => {
    setCalorieTargetRangeLowerBound(parseInt(lower));
    setCalorieTargetRangeUpperBound(parseInt(upper));
  }

  const scrollScrollView = (e) => {
    const layout = e.nativeEvent.layout;
    scrollViewRef.current.scrollTo({x: layout.x, y: layout.y});
  }

  const onActivateChangeRangeForm = () => {
    scrollViewRef.current.scrollToEnd();
  }

  return(
    <ScrollView
        contentContainerStyle={styles.mainContentContainer}
        keyboardShouldPersistTaps='handled'
        ref={scrollViewRef}
    >
      <Divider height={20} />
      <CalorieSummary
        currentCalories={totalCalories}
        lowerBound={calorieTargetRangeLowerBound}
        upperBound={calorieTargetRangeUpperBound}
      />
      <Divider height={40} />
      <FoodInput onLayoutForm={scrollScrollView} onLogFood={addFood} onLogDish={addDish} onLogMeal={addMeal} />
      {foodItems.map((item, index) => {
        return (<View key={index} style={styles.foodlogEntryContainer}>
          {item.type === 'food' && <FoodItem item={item} />}
          {item.type  === 'dish' && <Dish dish={item} />}
          {item.type === 'meal' && <Meal meal={item} />}
        </View>);
      })}
      <Divider height={20} />
      <ThemedInputContainer>
        <AddButton
          title="New Day - Reset!"
          type="highlight"
          onPress={handleNewDayPress}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      <CalorieRangeTargetForm
        onSubmit={onSubmitCalorieRangeTargetForm}
        lowerBound={calorieTargetRangeLowerBound}
        upperBound={calorieTargetRangeUpperBound}
        onActivateForm={onActivateChangeRangeForm}
      />
      <Divider height={320} />
    </ScrollView>
  );
}

export default DaylogScreen;
