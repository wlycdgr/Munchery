// 3rd party libs
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Munchery components
import Divider from '../layout/Divider.jsx';
import FoodContainer from "../views/FoodContainer";

const styles = StyleSheet.create({
    mainContentContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },

    foodlogEntryContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

const DetailsScreen = (props) => {
    const { foods } = props;

    // TODO move to Details
    const onDeleteFood = (id) => {
        console.log(`onDeleteFood called with id ${id}`);
    }

    return(
        <View
            contentContainerStyle={styles.mainContentContainer}
            keyboardShouldPersistTaps='handled'
        >
            <Divider height={50} />
            {foods.map((item, index) => {
              return (
                <View key={index} style={styles.foodlogEntryContainer}>
                <FoodContainer
                    ogCal={item.cal}
                    ogDesc={item.desc}
                    ogMode='view'
                    onDelete={onDeleteFood}
                />
                  <Divider height={20} />
               </View>
              );
            })}
            <Divider height={20} />
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        foods: state.foods,
    }
};

export default connect(mapStateToProps)(DetailsScreen);
