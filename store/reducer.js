import { UPDATE_TARGET_CALORIE_RANGE } from "./actionLabels.js";

const initialState = {
    lowerBound: 1800,
    upperBound: 2400,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TARGET_CALORIE_RANGE: {
            const {newLowerBound, newUpperBound} = action.data;

            return {
                ...state,
                lowerBound: newLowerBound,
                upperBound: newUpperBound,
            };
        }
        default: {
            return state;
        }
    }
}
