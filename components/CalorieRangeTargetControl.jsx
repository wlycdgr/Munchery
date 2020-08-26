import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  calorieRange: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const CalorieRangeTargetControl = (props) => {
  const {
    lowerBound,
    upperBound,
  } = props;

  const [isUpdatingRange, setIsUpdatingRange] = useState(false);
  const [newLowerBound, setNewLowerBound] = useState(lowerBound);
  const [newUpperBound, setNewUpperBound] = useState(upperBound);

  const handleChangeRangePress = () => {
    setIsUpdatingRange(true);
  }

  const handleCancelPress = () => {
    setNewLowerBound(lowerBound);
    setNewUpperBound(upperBound);
    setIsUpdatingRange(false);
  }

  const handleSavePress = () => {
    const { submit } = props;

    submit(newLowerBound, newUpperBound);

    setIsUpdatingRange(false);
  }

  const renderCurrentRangeReadout = () => {
    return(
      <>
        <Text>Your calorie range target is</Text>
        <Text style={styles.calorieRange}>{`${lowerBound} - ${upperBound}`}</Text>
        <Button
          title="Change Range"
          onPress={handleChangeRangePress}
        />
      </>
    );
  }

  const renderRangeUpdateForm = () => {
    return(
      <>
        <TextInput
          placeholder="Lower bound"
          value={newLowerBound}
          onChangeText={text => setNewLowerBound(text)}
        />
        <Text>to</Text>
        <TextInput
          placeholder="Upper bound"
          value={newUpperBound}
          onChangeText={text => setNewUpperBound(text)}
        />
        <Button
          title="Cancel"
          onPress={handleCancelPress}
        />
        <Button
          title="Save"
          onPress={handleSavePress}
        />
      </>
    )
  }

  return(
    <View style={styles.container}>
      {!isUpdatingRange && renderCurrentRangeReadout()}
      {isUpdatingRange && renderRangeUpdateForm()}
    </View>
  );
}

export default CalorieRangeTargetControl;