import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';

import AddButton from '../inputs/AddButton.jsx';
import ThemedTextInput from '../inputs/ThemedTextInput.jsx';
import Divider from '../layout/Divider.jsx';
import FoodItem from '../views/FoodItem.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer";

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
  }
});

const AddDishForm = (props) => {
  const { onCancel } = props;

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isShowingAddIngredientForm, setIsShowingAddIngredientForm] = useState(false);
  const [isShowNameError, setIsShowNameError] = useState(false);
  const [isShowIngredientsError, setIsShowIngredientsError] = useState(false);
  const [isLayoutReported, setIsLayoutReported] = useState(false);

  const isFormValid = () => {
    return (isNameValid() && isIngredientsValid());
  }

  const isNameValid = () => (name !== '');
  const isIngredientsValid = () => (ingredients.length > 0);

  const onPressAddIngredient = () => {
    setIsShowingAddIngredientForm(true);
  }

  const onCancelAddIngredientForm = () => {
    setIsShowingAddIngredientForm(false);
  }

  const onSubmitAddIngredientForm = (food) => {
    setIngredients([...ingredients, food]);
    setIsShowingAddIngredientForm(false);
  }

  const onChangeTextName = (nameValue) => {
    if (nameValue !== '' && isShowNameError) {
      setIsShowNameError(true);
    }

    setName(nameValue);
  }

  const onPressLogDish = () => {
    const { onLayout, onSubmit } = props;

    if (!isFormValid()) {
      if (!isNameValid()) {
        setIsShowNameError(true);
      }
      if (!isIngredientsValid()) {
        setIsShowIngredientsError(true);
      }

      return;
    }

    setIsShowNameError(false);
    setIsShowIngredientsError(false);

    onSubmit({
      type: 'dish',
      name,
      ingredients,
    });

    onLayout({nativeEvent: {layout: {x: 0, y: 0}}});
  }

  const onLayout = (e) => {
    const { onLayout } = props;

    if (isLayoutReported) return;

    if (onLayout) {
      onLayout(e);
    }

    setIsLayoutReported(true);
  }

  return(
    <View
      style={styles.view}
      onLayout={onLayout}
    >
      <ThemedInputContainer>
        <AddButton
          title="Cancel Logging Dish"
          onPress={onCancel}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      <ThemedInputContainer>
        <ThemedTextInput
          autoFocus={true}
          placeholder="Dish Name"
          value={name}
          onChangeText={onChangeTextName}
          isShowError={isShowNameError}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      {ingredients.map((ingredient, index) => <FoodItem key={index} item={ingredient} />)}
      {ingredients.length > 0 && <Divider height={20} />}
      {!isShowingAddIngredientForm &&
        <ThemedInputContainer>
          <AddButton
            title="Add Ingredient"
            onPress={onPressAddIngredient}
          />
        </ThemedInputContainer>
      }
      {isShowingAddIngredientForm &&
        <AddFoodForm
          onCancel={onCancelAddIngredientForm}
          onSubmit={onSubmitAddIngredientForm}
          onLayout={props.onLayout}
          submitLabel="Add"
        />
      }
      {!isShowingAddIngredientForm &&
        <>
          <Divider height={60} />
          <ThemedInputContainer>
            <AddButton
              title="Log Dish"
              onPress={onPressLogDish}
              type="highlight"
              isInactive={!isFormValid()}
            />
          </ThemedInputContainer>
        </>
      }
    </View>
  );
}

export default AddDishForm;
