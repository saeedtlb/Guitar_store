import React from 'react';
import { Switch, Route } from 'react-router-dom';

// AUTH
import Auth from './HOC/Auth.jsx';

// PUBLIC COMPONENTS
import Layout from './HOC/Layout.jsx';
import Home from './components/Home/';
import RegisterLogin from './components/Register_login/index.jsx';
import Register from './components/Register_login/Register.jsx';
import Shop from './components/Shop/index.jsx';
import ProductPage from './components/product/';
import Reset from './components/Reset_User/';
import ResetPassword from './components/Reset_User/Reset_password.jsx';

// PRIVATE COMPONENTS
import UserDashboard from './components/User/index';
import UpdateProfile from './components/User/Update_profile.jsx';
import ManageSite from './components/User/Admin/ManageSite.jsx';
import AddProduct from './components/User/Admin/AddProduct.jsx';
import AddFile from './components/User/Admin/AddFile';
import ManageCategories from './components/User/Admin/Manage_categories.jsx';
import Cart from './components/User/Cart.jsx';

// NOT FOUND
import NotFound from './components/utils/Not_found';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        {/* PRIVATE */}
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route
          path="/user/user_profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route path="/admin/add_file" exact component={Auth(AddFile, true)} />
        <Route
          path="/admin/site_info"
          exact
          component={Auth(ManageSite, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />

        {/* PUBLIC */}
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/reset_user" exact component={Auth(Reset, false)} />
        <Route
          path="/reset_password/:token"
          exact
          component={Auth(ResetPassword, false)}
        />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductPage, null)}
        />
        <Route path="/" exact component={Auth(Home, null)} />

        {/* NOT FOUND */}
        <Route component={Auth(NotFound)} />
      </Switch>
    </Layout>
  );
};

// window.addEventListener('click', (e) => {
//   const allCookies = document.cookie.split(';');
//
//   for (let i = 0; i < allCookies.length; i++) {
//     if (allCookies[i].split('=')[0] === 'x_auth') {
//       console.log('come');
//       allCookies = allCookies[i] + `=;expires=${new Date(0).toUTCString}`;
//       break;
//     }
//   }
// });

export default Routes;
