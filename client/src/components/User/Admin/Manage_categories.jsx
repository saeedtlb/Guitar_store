import React, { Component } from 'react';

import UserLayout from '../../../HOC/UserLayout.jsx';
import ManageBrands from './ManageBrands.jsx';
import ManageWoods from './ManageWoods.jsx';

class ManageCategories extends Component {
  render() {
    return (
      <UserLayout>
        <ManageBrands />
        <ManageWoods />
      </UserLayout>
    );
  }
}

export default ManageCategories;
