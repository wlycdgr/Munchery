import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'orange',
        height: 60,
        alignItems: 'center'
    },
    desc: {
        width: 250,
    }
});

const FoodView = (props) => {
    const {
        cal,
        desc,
        isEditable,
    } = props;

    const onPressEdit = (e) => {
        const { onPressEdit } = props;

        onPressEdit(e);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.desc}>{desc}</Text>
            <Text>{cal}</Text>
            {isEditable && <Button onPress={onPressEdit} title="Edit"></Button>}
        </View>
    );
}

export default FoodView;
