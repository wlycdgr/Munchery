import AsyncStorage from "@react-native-community/async-storage";
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
import {
    SK_CALORIE_RANGE,
    SK_FOODS,
    SK_PREFABS,
    SK_PROTEIN_RANGE,
} from "../constants/storageKeys";

// TODO move defaults to a constants file
const initialState = {
    lowerBound: 1600,
    upperBound: 2400,
    proteinLowerBound: 40,
    proteinUpperBound: 120,
    foods: [],
    foodIdCounter: 1,
    prefabs: [],
    prefabIdCounter: 1,
}

const asyncStoreCalorieRange = calorieRange => AsyncStorage.setItem(SK_CALORIE_RANGE, JSON.stringify(calorieRange));
const asyncStoreProteinRange = proteinRange => AsyncStorage.setItem(SK_PROTEIN_RANGE, JSON.stringify(proteinRange));
const asyncStoreFoods = foods => AsyncStorage.setItem(SK_FOODS, JSON.stringify(foods));
const asyncStorePrefabs = prefabs => AsyncStorage.setItem(SK_PREFABS, JSON.stringify(prefabs));

const processLoadedFoods = foods => foods.map((food, index) => ({
    ...food,
    cal: food.cal || 0,
    protein: food.protein || 0,
    id: index + 1,
}));

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
        case INIT_STORE: {
            const loadedStore = (action.data !== null && action.data) || state;
            const {
                foods,
                prefabs,
                calorieRange,
                proteinRange,
            } = loadedStore;

            const processedLoadedFoods = (foods && processLoadedFoods(foods)) || [];
            const processedLoadedPrefabs = (prefabs && processLoadedFoods(prefabs)) || [];
            const loadedLowerBound = (calorieRange && calorieRange.lowerBound) || state.lowerBound;
            const loadedUpperBound = (calorieRange && calorieRange.upperBound) || state.upperBound;
            const loadedProteinLowerBound = (proteinRange && proteinRange.lowerBound) || state.proteinLowerBound;
            const loadedProteinUpperBound = (proteinRange && proteinRange.upperBound) || state.proteinUpperBound;

            return {
                ...state,
                foods: processedLoadedFoods,
                foodIdCounter: processedLoadedFoods.length + 1,
                prefabs: processedLoadedPrefabs,
                prefabIdCounter: processedLoadedPrefabs.length + 1,
                lowerBound: loadedLowerBound,
                upperBound: loadedUpperBound,
                proteinLowerBound: loadedProteinLowerBound,
                proteinUpperBound: loadedProteinUpperBound,
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
        case UPDATE_TARGET_PROTEIN_RANGE: {
            const { newLowerBound, newUpperBound } = action.data;

            const newRange = { proteinLowerBound: newLowerBound, proteinUpperBound: newUpperBound };

            asyncStoreProteinRange(newRange);

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
