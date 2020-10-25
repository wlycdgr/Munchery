import {
    ADD_FOOD,
    ADD_PREFAB,
    DELETE_FOOD,
    DELETE_PREFAB,
    INIT_STORE,
    RESET_FOODS,
    UPDATE_FOOD,
    UPDATE_PREFAB,
    UPDATE_TARGET_CALORIE_RANGE,
    UPDATE_TARGET_PROTEIN_RANGE,
} from "./actionLabels.js";

export function addFood(newFood) {
    return {
        type: ADD_FOOD,
        data: newFood,
    }
}

export function addPrefab(newPrefab) {
    return {
        type: ADD_PREFAB,
        data: newPrefab,
    }
}

export function deleteFood(id) {
    return {
        type: DELETE_FOOD,
        data: id,
    }
}

export function deletePrefab(id) {
    return {
        type: DELETE_PREFAB,
        data: id,
    }
}

export function initStore(muncheryStore) {
    return {
        type: INIT_STORE,
        data: muncheryStore,
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

export function updatePrefab(prefab) {
    return {
        type: UPDATE_PREFAB,
        data: prefab,
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

export function updateTargetProteinRange(newRange) {
    const { newLowerBound, newUpperBound } = newRange;

    if (!!!newLowerBound || !!!newUpperBound) {
        return { type: 'NO_OP'};
        console.error('Invalid argument passed to actionCreators#updateTargetProteinRange');
    }

    return {
        type: UPDATE_TARGET_PROTEIN_RANGE,
        data: newRange,
    }
}
