import React, { useState } from 'react';

import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import CalorieRangeTargetForm from "../forms/CalorieRangeTargetForm";
import ResetFoodsButton from "../forms/ResetFoodsButton";
import MainContentContainer from "../views/MainContentContainer";

const OptionsTab = () => {
    const [isEditingCalorieRange, setIsEditingCalorieRange] = useState(false);

    const isCalorieRangeFormInEditMode = trueIfYes => setIsEditingCalorieRange(trueIfYes);

    return (
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={40} />
            <CalorieRangeTargetForm
                isEditing={isCalorieRangeFormInEditMode}
            />
            <Divider height={40} />
            {!isEditingCalorieRange && <ResetFoodsButton />}
        </MainContentContainer>
    );
}

export default OptionsTab;
