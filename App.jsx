import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import DaylogScreen from './components/screens/DaylogScreen.jsx';
import SettingsScreen from './components/screens/SettingsScreen.jsx';

import useCachedResources from "./hooks/useCachedResources";
import {render} from "react-native-web";

const Tab = createBottomTabNavigator();

function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'main') {
                          if (Platform.OS === 'android') {
                              iconName = focused
                                  ? 'md-add-circle'
                                  : 'md-add-circle-outline';
                          } else {
                              // iOS or other
                              iconName = focused
                                ? 'ios-add-circle'
                                : 'ios-add-circle-outline';
                          }
                      } else if (route.name === 'settings') {
                          if (Platform.OS === 'android') {
                              iconName = focused
                                  ? 'md-list-box'
                                  : 'md-list';
                          } else {
                              iconName = focused
                                ? 'ios-list-box'
                                : 'ios-list';
                          }
                      }

                      return (<Ionicons name={iconName} size={size} color={color} />);
                  }
              })}
          >
            <Tab.Screen
              name="main"
              component={DaylogScreen}
            />
            <Tab.Screen
                name="settings"
                component={SettingsScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;

