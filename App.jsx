import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux';
import MainScreen from './components/screens/AddScreen.jsx';
import DetailsScreen from './components/screens/EditScreen.jsx';
import SettingsScreen from './components/screens/OptionsScreen.jsx';
import {
    ADD_TAB_LABEL,
    EDIT_TAB_LABEL,
    OPTIONS_TAB_LABEL
} from './constants/tabLabels';

import useCachedResources from "./hooks/useCachedResources";

const Tab = createBottomTabNavigator();

const store = configureStore();
console.log(store.getState());

function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    const setTabBarIcon = (route, color, size) => {
        let iconName;

        if      (route.name === ADD_TAB_LABEL)      iconName = isAndroid() ? 'md-add' : 'ios-add';
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
                    })}
                >
                    {tabScreen(ADD_TAB_LABEL, MainScreen)}
                    {tabScreen(EDIT_TAB_LABEL, DetailsScreen)}
                    {tabScreen(OPTIONS_TAB_LABEL, SettingsScreen)}
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;

