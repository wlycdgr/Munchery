// 3rd party libs
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

// Munchery components
import CalorieSummary from '../views/CalorieSummary.jsx';
import FoodInput from '../forms/FoodInput.jsx';
import FoodContainer from '../views/FoodContainer.jsx';
import Dish from '../views/Dish.jsx';
import Meal from '../views/Meal.jsx';
import AddButton from '../inputs/AddButton.jsx';
import Divider from '../layout/Divider.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer";
import AddFoodForm from "../forms/AddFoodForm";

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

const DaylogScreen = (props) => {
  const { lowerBound, upperBound } = props;

  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      type: 'food',
      desc: 'Soylent',
      cal: 400,
    },

    {
      id: 2,
      type: 'dish',
      name: 'Fettucine Alfredo',
      ingredients: [
        { id: 3, type: 'food', desc: 'Fettucine', cal: 300 },
        { id: 4, type: 'food', desc: 'Alfredo Sauce', cal: 600 },
      ],
    },

    {
      id: 5,
      type: 'meal',
      name: 'Breakfast',
      items: [
        {
          id: 6,
          type: 'dish',
          name: 'Cheese Omelette',
          ingredients: [
            { id: 7, type: 'food', desc: 'Eggs', cal: 140 },
            { id: 8, type: 'food', desc: 'Cheddar', cal: 100 },
          ],
        },
        {
          id: 9,
          type: 'food',
          desc: 'Banana',
          cal: 60,
        },
      ],
    }
  ]);
  const [totalCalories, setTotalCalories] = useState(calculateTotalCalories(foodItems));
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

  const scrollScrollView = (e) => {
    const layout = e.nativeEvent.layout;
    scrollViewRef.current.scrollTo({x: layout.x, y: layout.y});
  }

  const onDeleteFood = (id) => {
    console.log(`onDeleteFood called with id ${id}`);
  }

  return(
    <ScrollView
        contentContainerStyle={styles.mainContentContainer}
        keyboardShouldPersistTaps='handled'
        ref={scrollViewRef}
    >
      <Divider height={80} />
      <CalorieSummary
        currentCalories={totalCalories}
        lowerBound={lowerBound}
        upperBound={upperBound}
      />
      <Divider height={40} />
      <AddFoodForm />
      {/*<FoodInput onLayoutForm={scrollScrollView} onLogFood={addFood} onLogDish={addDish} onLogMeal={addMeal} />*/}
      {/*<Divider height={50} />*/}
      {/*{foodItems.map((item, index) => {*/}
      {/*  return (*/}
      {/*    <View key={index} style={styles.foodlogEntryContainer}>*/}
      {/*      {item.type === 'food' &&*/}
      {/*        <FoodContainer*/}
      {/*            ogCal={item.cal}*/}
      {/*            ogDesc={item.desc}*/}
      {/*            ogMode='view'*/}
      {/*            onLayoutForm={scrollScrollView}*/}
      {/*            onDelete={onDeleteFood}*/}
      {/*        />*/}
      {/*      }*/}
      {/*      {item.type  === 'dish' && <Dish dish={item} />}*/}
      {/*      {item.type === 'meal' && <Meal meal={item} />}*/}
      {/*      <Divider height={20} />*/}
      {/*   </View>*/}
      {/*  );*/}
      {/*})}*/}
      {/*<Divider height={20} />*/}
      {/*<ThemedInputContainer>*/}
      {/*  <AddButton*/}
      {/*    title="New Day - Reset!"*/}
      {/*    type="highlight"*/}
      {/*    onPress={handleNewDayPress}*/}
      {/*  />*/}
      {/*</ThemedInputContainer>*/}
      {/*<Divider height={20} />*/}
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    lowerBound: state.lowerBound,
    upperBound: state.upperBound,
  }
};

export default connect(mapStateToProps)(DaylogScreen);
