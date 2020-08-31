import React from 'react';
import { Text, View } from 'react-native';

import CalorieRangeTargetForm from "../forms/CalorieRangeTargetForm";

const SettingsScreen = () => {
    return (
        <View>
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

export default SettingsScreen;
