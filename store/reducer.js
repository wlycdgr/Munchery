import AsyncStorage from "@react-native-community/async-storage";
import {
    ADD_FOOD,
    ADD_PREFAB,
    DELETE_FOOD,
    DELETE_PREFAB,
    INIT_FOODS,
    INIT_PREFABS,
    INIT_TARGET_CALORIE_RANGE,
    RESET_FOODS,
    UPDATE_FOOD,
    UPDATE_PREFAB,
    UPDATE_TARGET_CALORIE_RANGE
} from "./actionLabels.js";
import {
    SK_CALORIE_RANGE,
    SK_FOODS,
    SK_PREFABS,
} from "../constants/storageKeys";

const initialState = {
    lowerBound: 1600,
    upperBound: 2400,
    foods: [],
    foodIdCounter: 1,
    prefabs: [],
    prefabIdCounter: 1,
}

const asyncStoreCalorieRange = calorieRange => AsyncStorage.setItem(SK_CALORIE_RANGE, JSON.stringify(calorieRange));
const asyncStoreFoods = foods => AsyncStorage.setItem(SK_FOODS, JSON.stringify(foods));
const asyncStorePrefabs = prefabs => AsyncStorage.setItem(SK_PREFABS, JSON.stringify(prefabs));

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOOD: {
            const { desc, cal, protein } = action.data;
            const newFood = {
                desc,
                cal: (cal && parseInt(cal, 10)) || 0, // just in case a client forgets
                protein: (protein && parseInt(protein, 10)) || 0, // just in case a client forgets
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
        case ADD_PREFAB: {
            const { desc, cal } = action.data;

            const newPrefab = {
                desc,
                cal: parseInt(cal, 10),
                id: state.prefabIdCounter
            };

            const newPrefabs = [...state.prefabs, newPrefab];

            asyncStorePrefabs(newPrefabs);

            return {
                ...state,
                prefabs: newPrefabs,
                prefabIdCounter: state.prefabIdCounter + 1,
            }
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

            asyncStorePrefabs(newPrefabs);

            return {
                ...state,
                prefabs: newPrefabs,
            };
        }
        case INIT_FOODS: {
            const loadedFoods = (action.data !== null && JSON.parse(action.data)) || [];

            const cleanedLoadedFoods = loadedFoods.map((food, index) => ({
                ...food,
                cal: food.cal || 0,
                protein: food.protein || 0,
                id: index + 1,
            }));

            return {
                ...state,
                foods: cleanedLoadedFoods,
                foodIdCounter: loadedFoods.length  + 1,
            }
        }
        case INIT_PREFABS: {
            const loadedPrefabs = (action.data !== null && JSON.parse(action.data)) || [];

            const cleanedLoadedPrefabs = loadedPrefabs.map((prefab, index) => ({
                ...prefab,
                cal: prefab.cal || 0,
                protein: prefab.protein || 0,
                id: index + 1,
            }));

            return {
                ...state,
                prefabs: cleanedLoadedPrefabs,
                prefabIdCounter: loadedPrefabs.length + 1,
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

            asyncStorePrefabs(updatedPrefabs);

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
