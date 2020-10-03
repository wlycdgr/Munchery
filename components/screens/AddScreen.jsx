// 3rd party libs
import React from 'react';

// Munchery components
import AddFoodForm from "../forms/AddFoodForm";
import CalorieSummary from '../views/CalorieSummary.jsx';
import Divider from '../layout/Divider.jsx';
import MainContentContainer from "../views/MainContentContainer";

const AddScreen = () => (
    <MainContentContainer>
      <Divider height={60} />
      <CalorieSummary />
      <Divider height={40} />
      <AddFoodForm/>
      <Divider height={20} />
    </MainContentContainer>
);

export default AddScreen;
