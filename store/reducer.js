import AsyncStorage from "@react-native-community/async-storage";
import {
    ADD_FOOD,
    DELETE_FOOD,
    DELETE_PREFAB,
    INIT_FOODS,
    INIT_TARGET_CALORIE_RANGE,
    RESET_FOODS,
    UPDATE_FOOD,
    UPDATE_PREFAB,
    UPDATE_TARGET_CALORIE_RANGE
} from "./actionLabels.js";

const initialState = {
    lowerBound: 1600,
    upperBound: 2400,
    foods: [],
    foodIdCounter: 1,
    prefabs: [
        {
            id: 1,
            desc: 'Soylent',
            cal: 400,
        },
        {
            id: 2,
            desc: 'Cheese ramen',
            cal: 550,
        },
        {
            id: 3,
            desc: 'Peanut butter & banana sandwich',
            cal: 600,
        }
    ],
    prefabIdCounter: 4,
}

const asyncStoreFoods = foods => AsyncStorage.setItem('@foods', JSON.stringify(foods));
const asyncStoreCalorieRange = calorieRange => AsyncStorage.setItem('@calorieRange', JSON.stringify(calorieRange));

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
                foods: newFoods,
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
        case DELETE_PREFAB: {
            const prefabId = action.data;

            const newPrefabs = state.prefabs.filter(prefab => prefab.id !== prefabId);

            return {
                ...state,
                prefabs: newPrefabs,
            };
        }
        case INIT_FOODS: {
            const loadedFoods = (action.data !== null && JSON.parse(action.data)) || [];

            return {
                ...state,
                foods: loadedFoods,
                foodIdCounter: loadedFoods.length  + 1,
            }
        }
        case INIT_TARGET_CALORIE_RANGE: {
            const loadedCalorieRange = (action.data !== null && JSON.parse(action.data)) || { };

            const newLowerBound = loadedCalorieRange.lowerBound || state.lowerBound;
            const newUpperBound = loadedCalorieRange.upperBound || state.upperBound;

            return {
                ...state,
                lowerBound: newLowerBound,
                upperBound: newUpperBound,
            };
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
        case UPDATE_PREFAB: {
            const updatedPrefab = action.data;

            const updatedPrefabs = [...state.prefabs.filter(prefab => prefab.id !== updatedPrefab.id), updatedPrefab];

            return {
                ...state,
                prefabs: updatedPrefabs,
            };
        }
        case UPDATE_TARGET_CALORIE_RANGE: {
            const {newLowerBound, newUpperBound} = action.data;

            const newRange = { lowerBound: newLowerBound, upperBound: newUpperBound };

            asyncStoreCalorieRange(newRange);

            return {
                ...state,
                ...newRange,
            };
        }
        default: {
            return state;
        }
    }
}
