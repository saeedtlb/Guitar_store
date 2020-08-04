import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
// MATERIAL UI
import Badge from '@material-ui/core/Badge';
// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/fontawesome-free-solid';
// REDUX
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: null,
      page: [
        {
          name: 'Home',
          linkTo: '/',
          public: true,
        },
        {
          name: 'Guitar',
          linkTo: '/shop',
          public: true,
        },
      ],
      user: [
        {
          name: 'My Cart',
          linkTo: '/user/cart',
          public: false,
        },
        {
          name: 'My Account',
          linkTo: '/user/dashboard',
          public: false,
        },
        {
          name: 'Log in',
          linkTo: '/register_login',
          public: true,
        },
        {
          name: 'Log Out',
          linkTo: '/logout',
          public: false,
        },
      ],
    };
  }

  logoutHandler = async () => {
    const res = await this.props.dispatch(logoutUser());
    if (res.payload.success) {
      this.props.history.push('/');
    }
  };

  cartLink = (item, key) => {
    const shop = this.props.user.userData.cart.length + '';
    return (
      <Link to={item.linkTo} key={key}>
        <Badge
          badgeContent={shop}
          color="secondary"
          style={{ paddingLeft: '5px' }}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
        >
          <FontAwesomeIcon
            icon={faShoppingBasket}
            style={{ fontSize: '22px' }}
          />
        </Badge>
      </Link>
    );
  };

  defaultLinks = (item, key) =>
    item.name === 'Log Out' ? (
      <div
        key={key}
        className="log_out_link"
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={key}>
        {item.name}
      </Link>
    );

  showLinks = (type) => {
    let list = [];
    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public) list.push(item);
        } else {
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
      return list.map((item, key) => {
        if (item.name === 'My Cart') {
          return this.cartLink(item, key);
        } else {
          return this.defaultLinks(item, key);
        }
      });
    }
  };

  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <Link to="/">
              <div className="logo">waves</div>
            </Link>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(Home));
