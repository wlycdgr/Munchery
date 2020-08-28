import React, { useState } from 'react';

import AddButton from './AddButton.jsx';
import ThemedTextInput from './ThemedTextInput.jsx';
import Divider from './Divider.jsx';
import FoodItem from './FoodItem.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import ThemedInputContainer from "./ThemedInputContainer";

const AddDishForm = (props) => {
  const { cancel } = props;
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isShowingAddIngredientForm, setIsShowingAddIngredientForm] = useState(false);

  const onAddIngredientPress = () => {
    setIsShowingAddIngredientForm(true);
  }

  const onAddIngredientFormCancel = () => {
    setIsShowingAddIngredientForm(false);
  }

  const onAddIngredientFormSubmit = (desc, cal) => {
    setIngredients([...ingredients, { desc, cal }]);
    setIsShowingAddIngredientForm(false);
  }

  const onLogDishPress = () => {
    const { submit } = props;

    submit({
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
          onPress={cancel}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      <ThemedInputContainer>
        <ThemedTextInput
          placeholder="Dish Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      {ingredients.map((ingredient, index) => <FoodItem key={index} item={ingredient} />)}
      {ingredients.length > 0 && <Divider height={20} />}
      {!isShowingAddIngredientForm &&
        <ThemedInputContainer>
          <AddButton
            title="Add Ingredient"
            onPress={onAddIngredientPress}
          />
        </ThemedInputContainer>
      }
      {isShowingAddIngredientForm &&
        <AddFoodForm
          cancel={onAddIngredientFormCancel}
          submit={onAddIngredientFormSubmit}
          submitLabel="Add"
        />
      }
      {!isShowingAddIngredientForm &&
        <>
          <Divider height={20} />
          <ThemedInputContainer>
            <AddButton
              title="Log Dish"
              onPress={onLogDishPress}
            />
          </ThemedInputContainer>
        </>
      }
    </>
  );
}

export default AddDishForm;
