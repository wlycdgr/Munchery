import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FoodItem from './FoodItem.jsx';

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold'
  }
});

const Dish = (props) => {
  const { dish } = props;
  const { name, ingredients } = dish;
  
  return(
    <View>
      <Text style={styles.name}>{name}</Text>
      {ingredients.map(ingredient=> <FoodItem item={ingredient} />)}
    </View>
  );
}

export default Dish;