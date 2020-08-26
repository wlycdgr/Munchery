import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import CalorieSummary from '../CalorieSummary.jsx';
import FoodInput from '../FoodInput.jsx';
import FoodItem from '../FoodItem.jsx';
import Dish from '../Dish.jsx';
import Meal from '../Meal.jsx';
import CalorieRangeTargetControl from '../CalorieRangeTargetControl.jsx';

const styles = StyleSheet.create({
  mainContentContainer: {
    display: 'flex',
    alignItems: 'center',
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
        { desc: 'Fettucine', cal: 300 },
        { desc: 'Alfredo Sauce', cal: 600 },
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
            { desc: 'Eggs', cal: 140 },
            { desc: 'Cheddar', cal: 100 },
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

  const addFood = (food) => {
    const { desc, cal } = food;

    setFoodItems([...foodItems, {
      type: 'food',
      desc,
      cal,
    }]);

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

  const adjustCalorieRangeTarget = (lower, upper) => {
    setCalorieTargetRangeLowerBound(lower);
    setCalorieTargetRangeUpperBound(upper);
  }

  return(
    <ScrollView contentContainerStyle={styles.mainContentContainer}>
      <CalorieSummary
        currentCalories={totalCalories}
        lowerBound={calorieTargetRangeLowerBound}
        upperBound={calorieTargetRangeUpperBound}
      />
      <FoodInput onLogFood={addFood} onLogDish={addDish} onLogMeal={addMeal} />
      <FlatList
        data={foodItems}
        renderItem={({item}) => {
          return (
            <View style={styles.foodlogEntryContainer}>
              {item.type === 'food' && <FoodItem item={item} />}
              {item.type  === 'dish' && <Dish dish={item} />}
              {item.type === 'meal' && <Meal meal={item} />}
            </View>
          );
        }}
      />
      <Button
        title="New Day"
        onPress={handleNewDayPress}
      />
      <CalorieRangeTargetControl
        submit={adjustCalorieRangeTarget}
        lowerBound={calorieTargetRangeLowerBound}
        upperBound={calorieTargetRangeUpperBound}
      />
    </ScrollView>
  );
}

export default DaylogScreen;
