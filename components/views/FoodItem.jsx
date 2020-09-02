import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: 60,
    alignItems: 'center'
  },
  desc: {
    width: 250,
  }
});

const FoodItem = (props) => {
  const { item } = props;
  const { desc, cal } = item;

  const [isEditing, setIsEditing] = useState(false);

  const onPressEdit = (e) => {
    setIsEditing(true);
  }

  const renderInfo = () => {
    return (
        <>
          <Text style={styles.desc}>{desc}</Text>
          <Text>{cal}</Text>
          <Button onPress={onPressEdit} title="Edit"></Button>
        </>
    );
  }

  const renderForm = () => {
    return (<Text>"Food Form!"</Text>);
  }

  return(
    <View style={styles.container}>
      {!isEditing && renderInfo()}
      {isEditing && renderForm()}
    </View>
  );
}

export default FoodItem;
