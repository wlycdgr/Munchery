import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
});

const MainContentContainer = (props) => (
    <View
        contentContainerStyles={styles.container}
        keyboardShouldPersistTaps='handled'
    >
        {props.children}
    </View>
);

export default MainContentContainer;
