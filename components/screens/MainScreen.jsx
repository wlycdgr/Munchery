// 3rd party libs
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

// Action creators
import { addFood } from '../../store/actionCreators';

// Munchery components
import CalorieSummary from '../views/CalorieSummary.jsx';
import Divider from '../layout/Divider.jsx';
import FoodContainer from "../views/FoodContainer";
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

const MainScreen = (props) => {
  const { foods, lowerBound, upperBound } = props;

  const [totalCalories, setTotalCalories] = useState(calculateTotalCalories(foods));

  const addFood = (food) => {
    const { actions } = props;
    const { addFood } = actions;
    addFood(food);
    setTotalCalories(totalCalories + parseInt(food.cal, 10));
  }

  // TODO move to Settings
  // const handleNewDayPress = () => {
  //  // setFoods([]);
  //   setTotalCalories(0);
  // }

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
      <Divider height={20} />
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
  return ({
    foods: state.foods,
    lowerBound: state.lowerBound,
    upperBound: state.upperBound,
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators({ addFood }, dispatch)
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
