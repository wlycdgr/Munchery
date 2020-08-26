import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await Font.loadAsync({
                    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setIsLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
