// React
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { addFood } from "../../store/actionCreators";

// Munchery
import Divider from '../layout/Divider.jsx';
import CalorieSummary from "../views/CalorieSummary";
import FoodView from "../views/FoodView";
import MainContentContainer from "../views/MainContentContainer";

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    instructions: {
        fontSize: 18,
    }
});

const listItems = [
    'banana',
    'apple',
    'fruit',
    'fingers',
    'good stuff',
    'hello dolly',
];

const PrefabTab = (props) => {
    const { prefabs } = props;

    const onPressPrefabLog = (id) => {
        const { actions } = props;
        const { addFood } = actions;

        const prefab = prefabs.find(prefab => prefab.id === id);

        addFood({ desc: prefab.desc, cal: prefab.cal });
    }

    const renderInstructions = () => (
        <View style={styles.centeredView}>
            <Text style={styles.instructions}>Tap a prefab to LOG it</Text>
        </View>
    )

    const renderPrefab = ({ item }) => {
        const { cal, desc, id } = item;

        return (
            <View key={id} style={styles.centeredView}>
                <FoodView
                    cal={cal}
                    desc={desc}
                    id={id}
                    onPress={onPressPrefabLog}
                />
                <Divider height={20}/>
            </View>
        );
    }

    const renderAllPrefabs = () => (
        <FlatList
            style={{ height: '65%' }}
            data={prefabs}
            renderItem={renderPrefab}
            keyExtractor={item => item.id}
        />
    );

    return(
        <MainContentContainer>
            <Divider height={60} />
            <CalorieSummary />
            <Divider height={20} />
            {renderInstructions()}
            <Divider height={20} />
            {renderAllPrefabs()}
        </MainContentContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        prefabs: state.prefabs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addFood,
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrefabTab);
