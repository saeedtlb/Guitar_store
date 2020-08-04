import React from 'react';

import UpdatePersonalInfo from './Update_presonal_info.jsx';

import UserLayout from '../../HOC/UserLayout.jsx';

export const UpdateProfile = () => {
  return (
    <UserLayout>
      <h1>Profile</h1>
      <UpdatePersonalInfo />
    </UserLayout>
  );
};

export default UpdateProfile;
