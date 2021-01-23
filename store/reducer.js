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

    // TODO try transitioning to this tidier structure
    targetRanges: {
        calorie: {
            lower: 1800,
            upper: 2200,
        },
        protein: {
            lower: 60,
            upper: 140,
        },
    },
}

// TODO transition to this more general storage helper
const asyncStorageSet = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const processLoadedFoods = foods => foods.map((food, index) => ({
    ...food,
    cal: food.cal || 0,
    protein: food.protein || 0,
    id: index + 1,
}));

const buildNewFood = ({ desc, cal, protein }) => ({
        desc: desc || '',
        cal: (cal && parseInt(cal, 10)) || 0,
        protein: (protein && parseInt(protein, 10)) || 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOOD: {
            const newFood = buildNewFood(action.data);

            newFood.id = state.foodIdCounter;

            const newFoods = [...state.foods, newFood];

            asyncStorageSet(SK_FOODS, newFoods);

            return {
                ...state,
                foods: newFoods,
                foodIdCounter: state.foodIdCounter + 1,
            };
        }
        case ADD_PREFAB: {
            const newPrefab = buildNewFood(action.data);

            newPrefab.id = state.prefabIdCounter;

            const newPrefabs = [...state.prefabs, newPrefab];

            asyncStorageSet(SK_PREFABS, newPrefabs);

            return {
                ...state,
                prefabs: newPrefabs,
                prefabIdCounter: state.prefabIdCounter + 1,
            }
        }
        // TODO refactor the delete cases to a single DELETE_ITEM
        case DELETE_FOOD: {
            const newFoods = state.foods.filter(food => food.id !== action.data);

            asyncStorageSet(SK_FOODS, newFoods);

            return {
                ...state,
                foods: newFoods,
            };
        }
        case DELETE_PREFAB: {
            const prefabId = action.data;

            const newPrefabs = state.prefabs.filter(prefab => prefab.id !== prefabId);

            asyncStorageSet(SK_PREFABS, newPrefabs);

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

            asyncStorageSet(SK_FOODS, newFoods);

            return {
                ...state,
                foods: newFoods,
                foodIdCounter: 1,
            }
        }
        case UPDATE_FOOD: {
            const updatedFood = action.data;

            const newFoods = [...state.foods.filter(food => food.id !== updatedFood.id), updatedFood];

            asyncStorageSet(SK_FOODS, newFoods);

            return {
                ...state,
                foods: newFoods,
            };
        }
        case UPDATE_PREFAB: {
            const updatedPrefab = action.data;

            const updatedPrefabs = [...state.prefabs.filter(prefab => prefab.id !== updatedPrefab.id), updatedPrefab];

            asyncStorageSet(SK_PREFABS, updatedPrefabs);

            return {
                ...state,
                prefabs: updatedPrefabs,
            };
        }
        // TODO refactor UPDATE_ cases to a single UPDATE_NUTRIENT_TARGET_RANGE case
        case UPDATE_TARGET_CALORIE_RANGE: {
            const {newLowerBound, newUpperBound} = action.data;

            const newRange = { lowerBound: newLowerBound, upperBound: newUpperBound };

            asyncStorageSet(SK_CALORIE_RANGE, newRange);

            return {
                ...state,
                ...newRange,
            };
        }
        case UPDATE_TARGET_PROTEIN_RANGE: {
            const { newLowerBound, newUpperBound } = action.data;

            const newRange = { proteinLowerBound: newLowerBound, proteinUpperBound: newUpperBound };

            asyncStorageSet(SK_PROTEIN_RANGE, newRange);

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
