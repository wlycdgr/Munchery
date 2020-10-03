import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetFoods, updateTargetCalorieRange } from "../../store/actionCreators";

import Divider from '../layout/Divider.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedButton from "../inputs/ThemedButton";
import CalorieSummary from "../views/CalorieSummary";
import CalorieRangeTargetForm from "../forms/CalorieRangeTargetForm";
import MainContentContainer from "../views/MainContentContainer";

const styles = StyleSheet.create({
    resetView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const OptionsScreen = (props) => {
    const { lowerBound, upperBound } = props;

    const onSubmitCalorieRangeTargetForm = (lower, upper) => {
        const { actions } = props;
        const { updateTargetCalorieRange } = actions;

        updateTargetCalorieRange({
            newLowerBound: lower,
            newUpperBound: upper,
        });
    }

    const onActivateChangeRangeForm = () => {
        // Scroll view (if needed)
    }

    const onNewDayPress = () => {
        const { actions } = props;
        const { resetFoods } = actions;

        resetFoods();
    }

    return (
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            <CalorieRangeTargetForm
                onSubmit={onSubmitCalorieRangeTargetForm}
                lowerBound={lowerBound}
                upperBound={upperBound}
                onActivateForm={onActivateChangeRangeForm}
            />
            <Divider height={40} />
            <View style={styles.resetView} >
                <ThemedInputContainer>
                  <ThemedButton
                    title="New Day - Reset!"
                    type="highlight"
                    onPress={onNewDayPress}
                  />
                </ThemedInputContainer>
            </View>
        </MainContentContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ resetFoods, updateTargetCalorieRange }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsScreen);
