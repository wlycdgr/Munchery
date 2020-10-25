import React, { useState } from 'react';

import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import NutrientRangeTargetForm from "../forms/NutrientRangeTargetForm";
import ResetFoodsButton from "../forms/ResetFoodsButton";
import MainContentContainer from "../views/MainContentContainer";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { updateTargetCalorieRange, updateTargetProteinRange } from "../../store/actionCreators";

const OptionsTab = (props) => {
    const {
        actions,
        lowerBound,
        upperBound,
        proteinLowerBound,
        proteinUpperBound,
    } = props;
    const { updateTargetCalorieRange, updateTargetProteinRange } = actions;

    const [isEditingCalorieRange, setIsEditingCalorieRange] = useState(false);
    const [isEditingProteinRange, setIsEditingProteinRange] = useState(false);

    const setCalorieRangeEditing = trueIfYes => setIsEditingCalorieRange(trueIfYes);
    const setProteinRangeEditing = trueIfYes => setIsEditingProteinRange(trueIfYes);

    const _updateTargetCalorieRange = newRange => updateTargetCalorieRange(newRange);
    const _updateTargetProteinRange = newRange => updateTargetProteinRange(newRange);

    return (
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            {!isEditingProteinRange &&
                <NutrientRangeTargetForm
                    setEditing={setCalorieRangeEditing}
                    isEditing={isEditingCalorieRange}
                    updateRange={_updateTargetCalorieRange}
                    lowerBound={lowerBound}
                    upperBound={upperBound}
                    nutrientType="calorie"
                />
            }
            <Divider height={20} />
            {!isEditingCalorieRange &&
                <NutrientRangeTargetForm
                    setEditing={setProteinRangeEditing}
                    isEditing={isEditingProteinRange}
                    updateRange={_updateTargetProteinRange}
                    lowerBound={proteinLowerBound}
                    upperBound={proteinUpperBound}
                    nutrientType="protein"
                />
            }
            <Divider height={40} />
            {(!isEditingCalorieRange && !isEditingProteinRange) && <ResetFoodsButton />}
        </MainContentContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        lowerBound: state.lowerBound,
        upperBound: state.upperBound,
        proteinLowerBound: state.proteinLowerBound,
        proteinUpperBound: state.proteinUpperBound,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateTargetCalorieRange, updateTargetProteinRange }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsTab);
