import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e8e8e8',
        width: '60%',
        height: 40,
        alignItems: 'center',
    },
    desc: {
        fontSize: 16,
        width: '60%',
        paddingLeft: 5,
    },
    cal: {
        width: '40%',
        textAlign: 'right',
        paddingRight: 5,
    }
});

const FoodView = (props) => {
    const {
        cal,
        desc,
    } = props;

    const onPress = () => {
        const { id, onPressEdit } = props;

        onPressEdit(id);
    }

    return(
        <TouchableOpacity
            onPress={onPress}
            style={styles.mainContainer}
        >
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.cal}>{cal.toString()}</Text>
        </TouchableOpacity>
    );
}

export default FoodView;
