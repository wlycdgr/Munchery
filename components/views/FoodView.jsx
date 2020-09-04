import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ThemedInputContainer from "../layout/ThemedInputContainer";
import AddButton from "../inputs/AddButton";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e8e8e8',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
    },
    desc: {
        fontSize: 16,
    }
});

const FoodView = (props) => {
    const {
        cal,
        desc,
        id,
        isEditable,
    } = props;

    const onPressEdit = (e) => {
        const { onPressEdit } = props;

        onPressEdit(e);
    }

    const onPressDelete = (e) => {
        const { id, onPressDelete } = props;

        if (onPressDelete) {
            onPressDelete(id);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.desc}>{desc}</Text>
            <Text>{cal.toString()}</Text>
            {isEditable &&
                <ThemedInputContainer
                    widthPct={15}
                >
                    <AddButton
                        title="Edit"
                        onPress={onPressEdit}
                    />
                </ThemedInputContainer>
            }
            {isEditable &&
                <ThemedInputContainer
                    widthPct={15}
                >
                    <AddButton
                        title="X"
                        onPress={onPressDelete}
                    />
                </ThemedInputContainer>
            }
        </View>
    );
}

export default FoodView;
