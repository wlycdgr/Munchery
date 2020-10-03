// 3rd party libs
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Munchery components
import Divider from '../layout/Divider.jsx';
import FoodContainer from "../views/FoodContainer";
import CalorieSummary from "../views/CalorieSummary";

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

const EditScreen = (props) => {
    const { foods } = props;

    return(
        <View
            contentContainerStyle={styles.mainContentContainer}
            keyboardShouldPersistTaps='handled'
        >
            <Divider height={100} />
            <CalorieSummary />
            <Divider height={60} />
            {foods.map((food, index) => {
              return (
                <View key={index} style={styles.foodlogEntryContainer}>
                <FoodContainer
                    id={food.id}
                    ogCal={food.cal}
                    ogDesc={food.desc}
                    ogMode='view'
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
    return ({
        foods: state.foods,
    });
};

export default connect(mapStateToProps, undefined)(EditScreen);
