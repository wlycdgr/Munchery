import AsyncStorage from "@react-native-community/async-storage";
import {
    ADD_FOOD,
    DELETE_FOOD,
    INIT_FOODS,
    RESET_FOODS,
    UPDATE_FOOD,
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
    foodIdCounter: 4,
}

const asyncStoreFoods = foods => AsyncStorage.setItem('@foods', JSON.stringify(foods));

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOOD: {
            const { desc, cal } = action.data;
            const newFood = {
                desc,
                cal: parseInt(cal, 10), // just in case a client forgets
                id: state.foodIdCounter,
            };

            const newFoods = [...state.foods, newFood];

            asyncStoreFoods(newFoods);

            return {
                ...state,
                foods: [...state.foods, newFood],
                foodIdCounter: state.foodIdCounter + 1,
            };
        }
        case DELETE_FOOD: {
            const newFoods = state.foods.filter(food => food.id !== action.data);

            asyncStoreFoods(newFoods);

            return {
                ...state,
                foods: newFoods,
            };
        }
        case INIT_FOODS: {
            const loadedFoods = action.data || [];
            return {
                ...state,
                foods: loadedFoods,
            }
        }
        case RESET_FOODS: {
            const newFoods = [];

            asyncStoreFoods(newFoods);

            return {
                ...state,
                foods: newFoods,
                foodIdCounter: 1,
            }
        }
        case UPDATE_FOOD: {
            const updatedFood = action.data;

            const newFoods = [...state.foods.filter(food => food.id !== updatedFood.id), updatedFood];

            asyncStoreFoods(newFoods);

            return {
                ...state,
                foods: newFoods,
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
