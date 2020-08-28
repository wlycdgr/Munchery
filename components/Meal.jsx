import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FoodItem from './FoodItem.jsx';
import Dish from './Dish.jsx';

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemContainer: {
    marginTop: 5,
  }
});

const Meal = (props) => {
  const { meal } = props;
  const { name, items } = meal;

  return(
    <View>
      <Text style={styles.name}>{name}</Text>
      {items.map((item, index) => {
        return(
          <View key={index} style={styles.itemContainer}>
            {item.type === 'dish' && <Dish dish={item} />}
            {item.type === 'food' && <FoodItem item={item} />}
          </View>
        );
      })}
    </View>
  );
}

export default Meal;
