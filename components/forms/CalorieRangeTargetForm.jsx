import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import ThemedInputContainer from "../layout/ThemedInputContainer.jsx";
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import AddButton from '../inputs/AddButton.jsx';
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
  const [newLowerBound, setNewLowerBound] = useState('');
  const [newUpperBound, setNewUpperBound] = useState('');

  const onPressChangeRange = () => {
    const { onActivateForm } = props;

    setIsUpdatingRange(true);

    onActivateForm();
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
        <Text>Your target calorie range is</Text>
        <Text style={styles.calorieRange}>{`${lowerBound} - ${upperBound}`}</Text>
        <Divider height={10} />
        <ThemedInputContainer>
            <AddButton
              title="Change Range"
              onPress={onPressChangeRange}
            />
        </ThemedInputContainer>
      </>
    );
  }

  const renderRangeUpdateForm = () => {
    return(
      <>
        <ThemedInputContainer>
            <AddButton
              title="Cancel"
              onPress={handleCancelPress}
            />
        </ThemedInputContainer>
        <Divider height={20} />
        <ThemedInputContainer>
            <ThemedTextInput
              placeholder="New lower bound"
              value={newLowerBound}
              onChangeText={text => setNewLowerBound(text)}
            />
        </ThemedInputContainer>
        <ThemedInputContainer>
            <ThemedTextInput
              placeholder="New upper bound"
              value={newUpperBound}
              onChangeText={text => setNewUpperBound(text)}
            />
        </ThemedInputContainer>
        <Divider height={20} />
        <ThemedInputContainer>
            <AddButton
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
