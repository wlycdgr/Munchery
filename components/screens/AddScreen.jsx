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

const AddScreen = (props) => {
  const addFood = (food) => {
    const { actions } = props;
    const { addFood } = actions;

    addFood(food);
  }

  // TODO move to Settings
  // const handleNewDayPress = () => {
  //  // setFoods([]);
  //   setTotalCalories(0);
  // }

  return(
    <View
        contentContainerStyle={styles.mainContentContainer}
        keyboardShouldPersistTaps='handled'
    >
      <Divider height={100} />
      <CalorieSummary />
      <Divider height={60} />
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

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators({ addFood }, dispatch)
  });
}

export default connect(undefined, mapDispatchToProps)(AddScreen);
