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

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    // Bottom tab navigator icons setup
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                        if (route.name === ADD_TAB_LABEL) {
                            if (Platform.OS === 'android') iconName = 'md-add';
                            else iconName = 'ios-add';
                        } else if (route.name === EDIT_TAB_LABEL) {
                            if (Platform.OS === 'android')  iconName = 'md-today';
                            else iconName = 'ios-today';
                        } else if (route.name === OPTIONS_TAB_LABEL) {
                            if (Platform.OS === 'android') iconName = 'md-settings';
                            else iconName = 'ios-settings';
                        }

                          return (<Ionicons name={iconName} size={size} color={color} />);
                      }
                    })}
              >
                <Tab.Screen
                  name={ADD_TAB_LABEL}
                  component={MainScreen}
                />
                  <Tab.Screen
                      name={EDIT_TAB_LABEL}
                      component={DetailsScreen}
                  />
                <Tab.Screen
                    name={OPTIONS_TAB_LABEL}
                    component={SettingsScreen}
                />
              </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;

