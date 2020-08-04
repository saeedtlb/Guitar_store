import React from 'react';

import MyButton from '../utils/button.jsx';
import Login from './Login.jsx';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>New Customers</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              quas dolore repellendus cumque sed corporis cum commodi veritatis
              ipsa perspiciatis. Ducimus veritatis laborum fugit sapiente culpa
              dicta quisquam commodi explicabo. ipsum ia dignissimos ad maxime
              quod sint qui odit repudiandae nemo saepe praesentium vel.
            </p>
            <MyButton
              type="default"
              linkTo="register"
              title="Create an Account"
              addStyle={{
                margin: '10px 0px 0px 0px',
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
