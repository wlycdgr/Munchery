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

const NutrientRangeTargetForm = (props) => {
    const {
        lowerBound,
        upperBound,
        isEditing,
    } = props;

    const [newLowerBound, setNewLowerBound] = useState(lowerBound.toString());
    const [newUpperBound, setNewUpperBound] = useState(upperBound.toString());

    const isRangeValid = () => parseInt(newUpperBound, 10) >= parseInt(newLowerBound, 10);

    const onPressChangeRange = () => {
        const { setEditing } = props;

        setEditing(true);
    }

    const handleCancelPress = () => {
        const { setEditing } = props;

        setNewLowerBound(lowerBound.toString());
        setNewUpperBound(upperBound.toString());
        setEditing(false);
    }

    // TODO error check for non-numerical characters (comma, etc), like with calorie field
    const handleSavePress = () => {
        const { actions, setEditing } = props;
        const { updateTargetCalorieRange } = actions;

        setEditing(false);
        updateTargetCalorieRange({
          newLowerBound: parseInt(newLowerBound, 10),
          newUpperBound: parseInt(newUpperBound, 10),
        });
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
              myOnChangeText={onChangeTextLowerBound}
            />
        </ThemedInputContainer>
        <ThemedInputContainer>
            <ThemedNumberInput
              placeholder="New upper bound"
              value={newUpperBound}
              myOnChangeText={onChangeTextUpperBound}
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
      {!isEditing && renderCurrentRangeReadout()}
      {isEditing && renderRangeUpdateForm()}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateTargetCalorieRange }, dispatch),
    }
}

export default connect(undefined, mapDispatchToProps)(NutrientRangeTargetForm);
