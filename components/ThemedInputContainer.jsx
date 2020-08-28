import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    base: {
        width: '60%',
        maxWidth: 500,
        height: 40,
    }
});

const ThemedInputContainer = ({ children }) => {
    return (
        <View style={styles.base}>{children}</View>
    );
}

export default ThemedInputContainer;
