import React from 'react';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Divider from '../layout/Divider.jsx';

import CalorieRangeTargetForm from "../forms/CalorieRangeTargetForm";

const SettingsScreen = (props) => {
    return (
        <View>
            <Divider height={100} />
            <Button onPress={() => console.log(props)} title="Log Props" />
            <Text>This is the settings tab. Nice!</Text>
            {/*<CalorieRangeTargetForm*/}
            {/*    onSubmit={onSubmitCalorieRangeTargetForm}*/}
            {/*    lowerBound={calorieTargetRangeLowerBound}*/}
            {/*    upperBound={calorieTargetRangeUpperBound}*/}
            {/*    onActivateForm={onActivateChangeRangeForm}*/}
            {/*/>*/}
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
    }
}

export default connect(mapStateToProps)(SettingsScreen);
