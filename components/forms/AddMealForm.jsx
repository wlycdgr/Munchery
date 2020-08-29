import React, { useState } from 'react';

import AddButton from '../inputs/AddButton.jsx';
import AddFoodForm from './AddFoodForm.jsx';
import AddDishForm from './AddDishForm.jsx';
import FoodItem from '../views/FoodItem.jsx';
import Dish from '../views/Dish.jsx';
import ThemedInputContainer from "../layout/ThemedInputContainer.jsx";
import ThemedTextInput from "../inputs/ThemedTextInput.jsx";
import Divider from '../layout/Divider.jsx';

const AddMealForm = (props) => {
  const { onCancel } = props;

  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [isShowingAddItemForm, setIsShowingAddItemForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [isShowNameError, setIsShowNameError] = useState(false);
  const [isShowItemsError, setIsShowItemsError] = useState(false);

  const isReadyToSubmit = () => {
    return (isNameValid() && isItemsValid());
  }

  const isNameValid = (testValue = name) => (testValue !== '');
  const isItemsValid = () => (items.length > 0);

  const showForm = (type) => {
    setIsShowingAddItemForm(true);
    setFormType(type);
  }

  const hideForm = () => {
    setIsShowingAddItemForm(false);
    setFormType('');
  }

  const onPressAddFood = () => showForm('food');

  const onPressAddDish = () => showForm('dish');

  const onSubmitAddFoodForm = (food) => {
    setItems([...items, food]);
    hideForm();
  }

  const onSubmitAddDishForm = (dish) => {
    setItems([...items, dish]);
    hideForm();
  }

  const onPressLogMeal = () => {
    const { onSubmit } = props;

    if (!isReadyToSubmit()) {
      if (!isNameValid()) {
        setIsShowNameError(true);
      }
      if (!isItemsValid()) {
        setIsShowItemsError(true);
      }

      return;
    }

    setIsShowNameError(false);
    setIsShowItemsError(false);

    onSubmit({
      type: 'meal',
      name,
      items,
    });
  }

  const onNameChangeText = (nameValue) => {
    if (isNameValid(nameValue) && !isNameValid()) {
      setIsShowNameError(false);
    }

    setName(nameValue);
  }

  const renderAddButtons = () => {
    return(
      <>
        <ThemedInputContainer>
          <AddButton
            title="Add Food"
            onPress={onPressAddFood}
          />
        </ThemedInputContainer>
        <Divider height={20} />
        <ThemedInputContainer>
          <AddButton
            title="Add Dish"
            onPress={onPressAddDish}
          />
        </ThemedInputContainer>
      </>
    );
  }

  const renderForm = () => {
    if (formType === 'food') {
      return(
        <AddFoodForm
          onCancel={hideForm}
          onSubmit={onSubmitAddFoodForm}
        />
      );
    }
    if (formType === 'dish') {
      return(
        <AddDishForm
          onCancel={hideForm}
          onSubmit={onSubmitAddDishForm}
        />
      );
    }
  }

  return(
    <>
      <ThemedInputContainer>
        <AddButton
          title="Cancel Logging Meal"
          onPress={onCancel}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      <ThemedInputContainer>
        <ThemedTextInput
          autoFocus={true}
          placeholder="Meal Name"
          value={name}
          onChangeText={onNameChangeText}
          isShowError={isShowNameError}
        />
      </ThemedInputContainer>
      <Divider height={20} />
      {items.map((item, index) => {
        if (item.name) { return <Dish key={index} dish={item} />}
        if (item.desc) { return <FoodItem key={index} item={item} />}
        return null;
      })}
      {items.length > 0 && <Divider height={20} />}
      {!isShowingAddItemForm && renderAddButtons()}
      {isShowingAddItemForm && renderForm()}
      {(!isShowingAddItemForm && isReadyToSubmit()) &&
        <>
          <Divider height={60} />
          <ThemedInputContainer>
            <AddButton
              title="Log Meal"
              type="highlight"
              onPress={onPressLogMeal}
            />
          </ThemedInputContainer>
        </>
      }
    </>
  );
}

export default AddMealForm;
