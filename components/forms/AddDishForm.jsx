import React, { useState } from 'react';

import AddButton from '../inputs/AddButton.jsx';
import ThemedTextInput from '../inputs/ThemedTextInput.jsx';
import Divider from '../layout/Divider.jsx';
import FoodItem from '../views/FoodItem.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer";

const AddDishForm = (props) => {
  const { onCancel } = props;

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isShowingAddIngredientForm, setIsShowingAddIngredientForm] = useState(false);
  const [isShowNameError, setIsShowNameError] = useState(false);
  const [isShowIngredientsError, setIsShowIngredientsError] = useState(false);

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
    const { onSubmit } = props;

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
  }

  return(
    <>
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
          submitLabel="Add"
        />
      }
      {(!isShowingAddIngredientForm && isFormValid()) &&
        <>
          <Divider height={60} />
          <ThemedInputContainer>
            <AddButton
              title="Log Dish"
              onPress={onPressLogDish}
              type="highlight"
            />
          </ThemedInputContainer>
        </>
      }
    </>
  );
}

export default AddDishForm;
