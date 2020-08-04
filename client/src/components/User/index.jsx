import React from 'react';

import UserLayout from '../../HOC/UserLayout.jsx';
import MyButton from '../utils/button.jsx';
import History from '../utils/User/History_block.jsx';

const UserDashboard = (props) => {
  const { userData: user } = props.user;
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>Name: {user.name}</span>
            <span>Last Name: {user.lastname}</span>
            <span>Email: {user.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="user/user_profile"
          />
        </div>
        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          {user.history ? (
            <div className="user_product_block_wrapper">
              <History products={user.history} />
            </div>
          ) : null}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
