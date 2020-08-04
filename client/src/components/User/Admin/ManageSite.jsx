import React from 'react';

import UserLayout from '../../../HOC/UserLayout.jsx';

import ManageSiteInfo from './ManageSiteInfo.jsx';

const ManageSite = () => {
  return (
    <UserLayout>
      <h1>Site Info</h1>
      <ManageSiteInfo />
    </UserLayout>
  );
};

export default ManageSite;
