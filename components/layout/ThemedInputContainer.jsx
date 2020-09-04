import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    base: {
        width: '60%',
        maxWidth: 500,
        height: 40,
    }
});

const ThemedInputContainer = ({ children, widthPct }) => {
    const customStyles = widthPct
        ? StyleSheet.compose(styles.base, { width: `${widthPct}%`})
        : styles.base;

    return (
        <View style={customStyles}>{children}</View>
    );
}

export default ThemedInputContainer;
