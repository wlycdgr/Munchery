import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DaylogScreen from './components/screens/DaylogScreen.jsx';

import useCachedResources from "./hooks/useCachedResources";

const Stack = createStackNavigator();

function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Munchery Alpha"
              component={DaylogScreen}
              options={{
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

