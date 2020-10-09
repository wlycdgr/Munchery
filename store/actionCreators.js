import {
    ADD_FOOD,
    DELETE_FOOD,
    INIT_FOODS,
    INIT_TARGET_CALORIE_RANGE,
    RESET_FOODS,
    UPDATE_FOOD,
    UPDATE_TARGET_CALORIE_RANGE,
} from "./actionLabels.js";

export function addFood(newFood) {
    return {
        type: ADD_FOOD,
        data: newFood,
    }
}

export function deleteFood(id) {
    return {
        type: DELETE_FOOD,
        data: id,
    }
}

export function initFoods(foods) {
    return {
        type: INIT_FOODS,
        data: foods,
    }
}

export function initTargetCalorieRange(range) {
    return {
        type: INIT_TARGET_CALORIE_RANGE,
        data: range,
    }
}

export function resetFoods() {
    return {
        type: RESET_FOODS,
    }
}

export function updateFood(food) {
    return {
        type: UPDATE_FOOD,
        data: food,
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
