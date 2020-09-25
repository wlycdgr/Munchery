import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Divider from '../layout/Divider';

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
    foods,
    lowerBound,
    upperBound,
  } = props;

  const totalCalories = foods.reduce(((acc, food) => acc + food.cal), 0);
  const isBelowRange = (lowerBound > totalCalories);
  const isWithinRange = (totalCalories >= lowerBound) && (totalCalories <= upperBound);
  const isAboveRange = (totalCalories > upperBound);

  const renderBelowRangeSummaryVersion = () => {
    const atLeast = (lowerBound - totalCalories);
    const atMost = (upperBound - totalCalories);

    return (
      <>
        <Text style={styles.text}>Shoot for</Text>
        <Text style={styles.calorieNumber}>{(atLeast === atMost) ? `~${atMost}` : `${atLeast} - ${atMost}`}</Text>
        <Divider  height={5} />
        <Text style={styles.text}>more calories today</Text>
      </>
    );
  }

  const renderWithinRangeSummaryVersion = () => {
    const maxMore = (upperBound - totalCalories);

    return (
      <>
        <Text style={styles.text}>Feel free to have up to</Text>
        <Text style={styles.calorieNumber}>{maxMore}</Text>
        <Divider  height={5} />
        <Text style={styles.text}>more calories today</Text>
      </>
    );
  }

  const renderAboveRangeSummaryVersion = () => {
        return (
      <>
        <Text style={styles.text}>Try to have</Text>
        <Text style={styles.calorieNumber}>No</Text>
        <Divider  height={5} />
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

const mapStateToProps = (state) => {
    return ({
        foods: state.foods,
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
    });
}

export default connect(mapStateToProps, undefined)(CalorieSummary);
