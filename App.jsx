// React
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-community/async-storage';

// Expo
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { useFonts, Sarala_400Regular } from "@expo-google-fonts/sarala";

// Redux
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux';
import { initFoods, initTargetCalorieRange } from "./store/actionCreators";

// Munchery
import NewTab from './components/tabs/NewTab.jsx';
import PrefabTab from "./components/tabs/PrefabTab";
import EditTab from './components/tabs/EditTab.jsx';
import SettingsTab from './components/tabs/OptionsTab.jsx';
import {
    NEW_TAB_LABEL,
    PREFAB_TAB_LABEL,
    EDIT_TAB_LABEL,
    OPTIONS_TAB_LABEL
} from './constants/tabLabels';
import {
    SK_CALORIE_RANGE,
    SK_FOODS,
} from "./constants/storageKeys";

const Tab = createBottomTabNavigator();

const store = configureStore();

function App() {
    let [fontsLoaded] = useFonts({
        Sarala_400Regular,
    });
    let [foodsLoaded, setFoodsLoaded] = useState(false);
    let [loadingFoods, setLoadingFoods] = useState(false);
    let [calorieRangeLoaded, setCalorieRangeLoaded] = useState(false);
    let [loadingCalorieRange, setLoadingCalorieRange] = useState(false);

    if (!foodsLoaded && !loadingFoods) {
        AsyncStorage.getItem(SK_FOODS)
            .then((result) => {
                store.dispatch(initFoods(result));
                setFoodsLoaded(true);
            })
            .catch((error) => {
                console.error('ERROR Could not load foods from storage: ', error);
            });
        setLoadingFoods(true);
    }

    if (!calorieRangeLoaded && !loadingCalorieRange) {
        AsyncStorage.getItem(SK_CALORIE_RANGE)
            .then((result) => {
                store.dispatch(initTargetCalorieRange(result));
                setCalorieRangeLoaded(true);
            })
            .catch((error) => {
                console.error('ERROR Could not load calorie range from storage: ', error);
            });
        setLoadingCalorieRange(true);
    }

    if (!fontsLoaded || !foodsLoaded || !calorieRangeLoaded) {
        return <AppLoading />;

    }

    const setTabBarIcon = (route, color, size) => {
        let iconName;

        if      (route.name === NEW_TAB_LABEL)      iconName = isAndroid() ? 'md-add' : 'ios-add';
        else if (route.name === PREFAB_TAB_LABEL)   iconName = isAndroid() ? 'md-add' : 'ios-add';
        else if (route.name === EDIT_TAB_LABEL)     iconName = isAndroid() ? 'md-today' : 'ios-today';
        else if (route.name === OPTIONS_TAB_LABEL)  iconName = isAndroid() ? 'md-settings' : 'ios-settings';

        return (<Ionicons name={iconName} size={size} color={color} />);
    }

    const isAndroid  = () => Platform.OS === 'android';

    const tabScreen = (name, component) => (
        <Tab.Screen
            name={name}
            component={component}
        />
    );

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    // Bottom tab navigator icons setup
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => setTabBarIcon(route, color, size),
                        unmountOnBlur: true,
                    })}
                >
                    {tabScreen(NEW_TAB_LABEL, NewTab)}
                    {tabScreen(PREFAB_TAB_LABEL, PrefabTab)}
                    {tabScreen(EDIT_TAB_LABEL, EditTab)}
                    {tabScreen(OPTIONS_TAB_LABEL, SettingsTab)}
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;

