import {
    ADD_FOOD,
    UPDATE_TARGET_CALORIE_RANGE
} from "./actionLabels.js";

const initialState = {
    lowerBound: 1800,
    upperBound: 2400,
    foods: [
        {
            id: 1,
            desc: 'TEST Soylent',
            cal: 400,
        },
        {
            id: 2,
            desc: 'TEST Banana',
            cal: 60,
        },
        {
            id: 3,
            desc: 'TEST Ramen',
            cal: 450,
        },
    ],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOOD: {
            return {
                ...state,
                foods: [...state.foods, action.data],
            };
        }
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
