import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import AddButton from './AddButton.jsx';
import FoodItem from './FoodItem.jsx';
import AddFoodForm from './AddFoodForm.jsx';

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
    <View>
      <AddButton
        title="Cancel Logging Dish"
        onPress={cancel}
      />
      <TextInput
        placeholder="Dish Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {ingredients.map((ingredient) => <FoodItem item={ingredient} />)}
      {!isShowingAddIngredientForm && 
        <AddButton
          title="Add Ingredient"
          onPress={onAddIngredientPress}
        />
      }
      {isShowingAddIngredientForm &&
        <AddFoodForm
          cancel={onAddIngredientFormCancel}
          submit={onAddIngredientFormSubmit}
          submitLabel="Add"
        />
      }
      {!isShowingAddIngredientForm && 
        <AddButton
          title="Log Dish"
          onPress={onLogDishPress}
        />
      }
    </View>
  );
}

export default AddDishForm;