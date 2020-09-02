import React from 'react';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Divider from '../layout/Divider.jsx';

import { bindActionCreators } from 'redux';
import CalorieRangeTargetForm from "../forms/CalorieRangeTargetForm";
import { updateTargetCalorieRange } from "../../store/actionCreators";

const SettingsScreen = (props) => {
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

    return (
        <View>
            <Divider height={100} />
            <Button onPress={() => console.log(props)} title="Log Props" />
            <Text>This is the settings tab. Nice!</Text>
            <CalorieRangeTargetForm
                onSubmit={onSubmitCalorieRangeTargetForm}
                lowerBound={lowerBound}
                upperBound={upperBound}
                onActivateForm={onActivateChangeRangeForm}
            />
        </View>
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
        actions: bindActionCreators({ updateTargetCalorieRange }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
