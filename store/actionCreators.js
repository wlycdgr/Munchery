import {
    ADD_FOOD,
    UPDATE_TARGET_CALORIE_RANGE,
} from "./actionLabels.js";

export function addFood(newFood) {
    return {
        type: ADD_FOOD,
        data: newFood,
    }
}

export function updateTargetCalorieRange(newRange) {
    const { newLowerBound, newUpperBound } = newRange;

    if (!!!newLowerBound || !!!newUpperBound) {
        return { type: 'NO_OP'};
        console.error('Invalid argument passed to actionCreators#updateTargetCalorieRange');
    }

    return {
        type: UPDATE_TARGET_CALORIE_RANGE,
        data: newRange,
    }
}
