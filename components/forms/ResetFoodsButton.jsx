import React from 'react';
import { StyleSheet, View } from "react-native";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { resetFoods } from "../../store/actionCreators";

import ThemedInputContainer from "../layout/ThemedInputContainer";
import ThemedButton from "../inputs/ThemedButton";

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
});

const ResetFoodsButton = (props) => {
    const onPress = () => props.actions.resetFoods();

    return (
        <View style={styles.view}>
            <ThemedInputContainer>
                <ThemedButton
                    title="New Day - Reset!"
                    type="highlight"
                    onPress={onPress}
                />
            </ThemedInputContainer>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ resetFoods }, dispatch),
    }
}

export default connect(undefined, mapDispatchToProps)(ResetFoodsButton);
