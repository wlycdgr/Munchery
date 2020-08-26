import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setIsLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
