import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ThemedInputContainer from "../layout/ThemedInputContainer.jsx";
import ThemedNumberInput from "../inputs/ThemedNumberInput.jsx";
import ThemedButton from '../inputs/ThemedButton.jsx';
import Divider from '../layout/Divider.jsx';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  calorieRange: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const CalorieRangeTargetForm = (props) => {
  const {
    lowerBound,
    upperBound,
  } = props;

  const [isUpdatingRange, setIsUpdatingRange] = useState(false);
  const [newLowerBound, setNewLowerBound] = useState(lowerBound.toString());
  const [newUpperBound, setNewUpperBound] = useState(upperBound.toString());

  const onPressChangeRange = () => {
    const { onActivateForm } = props;

    setIsUpdatingRange(true);

    onActivateForm();
  }

  const handleCancelPress = () => {
    setNewLowerBound(lowerBound.toString());
    setNewUpperBound(upperBound.toString());
    setIsUpdatingRange(false);
  }

  const handleSavePress = () => {
    const { onSubmit } = props;

    onSubmit(newLowerBound, newUpperBound);

    setIsUpdatingRange(false);
  }

  const renderCurrentRangeReadout = () => {
    return(
      <>
        <Text>Your target calorie range is</Text>
        <Text style={styles.calorieRange}>{`${lowerBound} - ${upperBound}`}</Text>
        <Divider height={10} />
        <ThemedInputContainer>
            <ThemedButton
              title="Change Range"
              onPress={onPressChangeRange}
            />
        </ThemedInputContainer>
      </>
    );
  }

  const onChangeTextLowerBound = (lbValue) => {
      const newValue = (lbValue === '') ? 0 : lbValue;
      if (parseInt(newValue) >= parseInt(newUpperBound)) {
          setNewUpperBound(lbValue);
      }
      setNewLowerBound(lbValue);
  }

  const onChangeTextUpperBound = (ubValue) => {
      const newValue = (ubValue === '') ? 0 : ubValue;
      if (parseInt(newValue) <= parseInt(newLowerBound)) {
          setNewLowerBound(ubValue);
      }
      setNewUpperBound(ubValue);
  }

  const renderRangeUpdateForm = () => {
    return(
      <>
        <ThemedInputContainer>
            <ThemedButton
              title="Cancel"
              onPress={handleCancelPress}
            />
        </ThemedInputContainer>
        <Divider height={20} />
        <ThemedInputContainer>
            <ThemedNumberInput
              placeholder="New lower bound"
              value={newLowerBound}
              onChangeText={onChangeTextLowerBound}
            />
        </ThemedInputContainer>
        <ThemedInputContainer>
            <ThemedNumberInput
              placeholder="New upper bound"
              value={newUpperBound}
              onChangeText={onChangeTextUpperBound}
            />
        </ThemedInputContainer>
        <Divider height={20} />
        <ThemedInputContainer>
            <ThemedButton
              title="Save"
              type="highlight"
              onPress={handleSavePress}
            />
        </ThemedInputContainer>
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

export default CalorieRangeTargetForm;
