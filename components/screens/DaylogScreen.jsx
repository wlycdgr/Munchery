// 3rd party libs
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

// Munchery components
import CalorieSummary from '../views/CalorieSummary.jsx';
import Divider from '../layout/Divider.jsx';
import FoodForm from "../forms/FoodForm";

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

const calculateTotalCalories = (foods) => {
  return (foods.reduce((acc, item) => {
    return (acc + parseInt(item.cal, 10));
  }, 0));
}

const DaylogScreen = (props) => {
  const { lowerBound, upperBound } = props;

  const [foods, setFoods] = useState([
    {
      id: 1,
      desc: 'Soylent',
      cal: 400,
    },
    {
      id: 2,
      desc: 'Banana',
      cal: 60,
    },
    {
      id: 3,
      desc: 'Ramen',
      cal: 450,
    }
  ]);
  const [totalCalories, setTotalCalories] = useState(calculateTotalCalories(foods));

  const addFood = (food) => {
    setFoods([...foods, food]);
    setTotalCalories(totalCalories + parseInt(food.cal, 10));
  }

  // TODO move to Settings
  const handleNewDayPress = () => {
    setFoods([]);
    setTotalCalories(0);
  }

  // TODO move to Details
  const onDeleteFood = (id) => {
    console.log(`onDeleteFood called with id ${id}`);
  }

  return(
    <View
        contentContainerStyle={styles.mainContentContainer}
        keyboardShouldPersistTaps='handled'
    >
      <Divider height={80} />
      <CalorieSummary
        currentCalories={totalCalories}
        lowerBound={lowerBound}
        upperBound={upperBound}
      />
      <Divider height={40} />
      <FoodForm
          isCanDelete={false}
          ogCal={0}
          ogDesc=''
          onSubmit={addFood}
      />
      {/*// TODO move to Details*/}
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
      {/*      <Divider height={20} />*/}
      {/*   </View>*/}
      {/*  );*/}
      {/*})}*/}
      {/*<Divider height={20} />*/}
      {/*// TODO move to Settings*/}
      {/*<ThemedInputContainer>*/}
      {/*  <AddButton*/}
      {/*    title="New Day - Reset!"*/}
      {/*    type="highlight"*/}
      {/*    onPress={handleNewDayPress}*/}
      {/*  />*/}
      {/*</ThemedInputContainer>*/}
      {/*<Divider height={20} />*/}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    lowerBound: state.lowerBound,
    upperBound: state.upperBound,
  }
};

export default connect(mapStateToProps)(DaylogScreen);
