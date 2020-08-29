import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  desc: {
    width: 200,
  }
});

const FoodItem = (props) => {
  const { item } = props;
  const { desc, cal } = item;
  
  return(
    <View style={styles.container}>
      <Text style={styles.desc}>{desc}</Text>
      <Text>{cal}</Text>
    </View>
  );
}

export default FoodItem;