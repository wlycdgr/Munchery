import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    touchableOpacity: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e8e8e8',
        width: '60%',
        height: 40,
        alignItems: 'center',
    },
    desc: {
        fontSize: 16,
        width: '100%',
        paddingLeft: 5,
    },
    stats: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 5,
    }
});

const FoodView = (props) => {
    const {
        cal,
        desc,
        protein,
    } = props;

    const onPress = () => {
        const { id, onPress } = props;

        onPress(id);
    }

    return(
        <TouchableOpacity
            onPress={onPress}
            style={styles.touchableOpacity}
        >
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.stats}>{cal.toString()}cal / {protein.toString()}p</Text>
        </TouchableOpacity>
    );
}

export default FoodView;
