import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  calorieNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  }
});

const CalorieSummary = (props) => {
  const {
    currentCalories,
    lowerBound,
    upperBound,
  } = props;

  const isBelowRange = (lowerBound > currentCalories);
  const isWithinRange = (currentCalories >= lowerBound) && (currentCalories <= upperBound);
  const isAboveRange = (currentCalories > upperBound);

  const renderBelowRangeSummaryVersion = () => {
    const atLeast = (lowerBound - currentCalories);
    const atMost = (upperBound - currentCalories);

    return (
      <>
        <Text style={styles.text}>Try to have</Text>
        <Text style={styles.calorieNumber}>{(atLeast === atMost) ? `~${atMost}` : `${atLeast} - ${atMost}`}</Text>
        <Text style={styles.text}>more calories today</Text>
      </>
    );
  }

  const renderWithinRangeSummaryVersion = () => {
    const maxMore = (upperBound - currentCalories);

    return (
      <>
        <Text style={styles.text}>Feel free to have up to</Text>
        <Text style={styles.calorieNumber}>{maxMore}</Text>
        <Text style={styles.text}>more calories today</Text>
      </>
    );
  }

  const renderAboveRangeSummaryVersion = () => {
        return (
      <>
        <Text style={styles.text}>Try to have</Text>
        <Text style={styles.calorieNumber}>No</Text>
        <Text style={styles.text}>more calories today :)</Text>
      </>
    );
  }

  return(
    <View style={styles.container}>
      {isBelowRange && renderBelowRangeSummaryVersion()}
      {isWithinRange && renderWithinRangeSummaryVersion()}
      {isAboveRange && renderAboveRangeSummaryVersion()}
    </View>
  );
}

export default CalorieSummary;
