import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTargetCalorieRange } from "../../store/actionCreators";

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

    const isRangeValid = () => parseInt(newUpperBound, 10) >= parseInt(newLowerBound, 10);

    const onPressChangeRange = () => {
        const { isEditing } = props;

        isEditing(true);
        setIsUpdatingRange(true);
    }

    const handleCancelPress = () => {
        const { isEditing } = props;

        isEditing(false);
        setNewLowerBound(lowerBound.toString());
        setNewUpperBound(upperBound.toString());
        setIsUpdatingRange(false);
    }

    const handleSavePress = () => {
        const { actions, isEditing } = props;
        const { updateTargetCalorieRange } = actions;

        updateTargetCalorieRange({
          newLowerBound: parseInt(newLowerBound, 10),
          newUpperBound: parseInt(newUpperBound, 10),
        });

        isEditing(false);
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
                        type="highlight"
                        onPress={onPressChangeRange}
                    />
                </ThemedInputContainer>
              </>
        );
    }

  const onChangeTextLowerBound = lbValue => setNewLowerBound(lbValue);

  const onChangeTextUpperBound = ubValue => setNewUpperBound(ubValue);

  const renderRangeUpdateForm = () => {
    return(
      <>
        <ThemedInputContainer>
            <ThemedButton
              title="Cancel"
              type="highlight"
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
              isInactive={!isRangeValid()}
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

const mapStateToProps = (state) => {
    return {
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateTargetCalorieRange }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalorieRangeTargetForm);
