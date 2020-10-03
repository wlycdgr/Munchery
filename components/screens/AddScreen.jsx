// 3rd party libs
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Munchery components
import AddFoodForm from "../forms/AddFoodForm";
import CalorieSummary from '../views/CalorieSummary.jsx';
import Divider from '../layout/Divider.jsx';

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
      <Divider height={60} />
      <CalorieSummary />
      <Divider height={40} />
      <AddFoodForm/>
      <Divider height={20} />
      {/*// TODO move to Settings*/}
      {/*<ThemedInputContainer>*/}
      {/*  <ThemedButton*/}
      {/*    title="New Day - Reset!"*/}
      {/*    type="highlight"*/}
      {/*    onPress={handleNewDayPress}*/}
      {/*  />*/}
      {/*</ThemedInputContainer>*/}
      {/*<Divider height={20} />*/}
    </View>
  );
}

export default AddScreen;
