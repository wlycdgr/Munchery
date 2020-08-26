import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AddFoodForm from './AddFoodForm.jsx';
import AddDishForm from './AddDishForm.jsx';
import FoodItem from './FoodItem.jsx';
import Dish from './Dish.jsx';

const AddMealForm = (props) => {
  const { cancel, submit } = props;
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [isShowingAddItemForm, setIsShowingAddItemForm] = useState(false);
  const [formType, setFormType] = useState('');

  const showForm = (type) => {
    setIsShowingAddItemForm(true);
    setFormType(type);
  }

  const hideForm = () => {
    setIsShowingAddItemForm(false);
    setFormType('');
  }

  const onAddFoodPress = () => showForm('food');

  const onAddDishPress = () => showForm('dish');

  const onAddFoodFormSubmit = (desc, cal) => {
    setItems([...items, { type: 'food', desc, cal }]);
    hideForm();
  }

  const onAddDishFormSubmit = (dish) => {
    setItems([...items, dish]);
    hideForm();
  }

  const onLogMealPress = () => {
    submit({
      type: 'meal',
      name,
      items,
    });  
  }

  const renderAddButtons = () => {
    return(
      <>
        <Button
          title="Add Food"
          onPress={onAddFoodPress}
        />
        <Button
          title="Add dish"
          onPress={onAddDishPress}
        />
      </>
    );
  }

  const renderForm = () => {
    if (formType === 'food') {
      return(
        <AddFoodForm
          cancel={hideForm}
          submit={onAddFoodFormSubmit}
        />
      );
    }
    if (formType === 'dish') {
      return(
        <AddDishForm
          cancel={hideForm}
          submit={onAddDishFormSubmit}
        />
      );
    }
  }

  return(
    <View>
      <Button
        title="Cancel Logging Meal"
        onPress={cancel}
      />
      <TextInput
        placeholder="Meal Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {items.map(item => {
        if (item.name) { return <Dish dish={item} />}
        if (item.desc) { return <FoodItem item={item} />}
        return null;
      })}
      {!isShowingAddItemForm && renderAddButtons()}
      {isShowingAddItemForm && renderForm()}
      {!isShowingAddItemForm &&
        <Button
          title="Log Meal"
          onPress={onLogMealPress}
        />
      }
    </View>
  );
}

export default AddMealForm;