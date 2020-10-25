import React, { useState } from 'react';

import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import NutrientRangeTargetForm from "../forms/NutrientRangeTargetForm";
import ResetFoodsButton from "../forms/ResetFoodsButton";
import MainContentContainer from "../views/MainContentContainer";

import { connect } from 'react-redux';

const OptionsTab = (props) => {
    const { lowerBound, upperBound } = props;

    const [isEditingCalorieRange, setIsEditingCalorieRange] = useState(false);

    const isCalorieRangeFormInEditMode = trueIfYes => setIsEditingCalorieRange(trueIfYes);

    return (
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            <NutrientRangeTargetForm
                setEditing={isCalorieRangeFormInEditMode}
                isEditing={isEditingCalorieRange}
                lowerBound={lowerBound}
                upperBound={upperBound}
            />
            <Divider height={40} />
            {!isEditingCalorieRange && <ResetFoodsButton />}
        </MainContentContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
    }
}

export default connect(mapStateToProps, undefined)(OptionsTab);
