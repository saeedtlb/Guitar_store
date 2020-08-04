import React, { Component } from 'react';

import UserLayout from '../../HOC/UserLayout.jsx';
import UserProductBlock from '../utils/User/Product_block.jsx';
import Paypal from '../utils/Paypal.jsx';

// Redux
import { connect } from 'react-redux';
import {
  getCartItems,
  removeCardItem,
  onSuccessBuy,
} from '../../actions/user_actions';

// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown } from '@fortawesome/fontawesome-free-solid';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      total: 0,
      showTotal: false,
      showSuccess: false,
    };
  }

  componentDidMount() {
    const cartItems = [];

    const { cart } = this.props.user.userData;

    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        cartItems.push(item.id);
      });
      this.props.dispatch(getCartItems(cartItems, cart)).then(() => {
        if (
          this.props.user.cartDetail &&
          this.props.user.cartDetail.length > 0
        ) {
          this.calculateTotal(this.props.user.cartDetail);
        }
      });
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach((item) => {
      total += item.price * item.quantity;
    });

    this.setState({
      total,
      showTotal: true,
    });
  };

  removeFromCart = (id) => {
    this.props.dispatch(removeCardItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  transactionError = (err) => {
    console.log('Your progress went wrong' + err);
  };

  transactionCanceled = (data) => {
    console.log('You have canceled your payment operation' + data);
  };

  transactionSuccess = (data) => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data,
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true,
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <UserProductBlock
              type="cart"
              products={this.props.user}
              removeItem={(id) => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div className="user_cart_sum">
                <div>Total Amount: $ {this.state.total}</div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <h4>Thank you</h4>
              </div>
            ) : (
              <div className="cart_no_items">
                <FontAwesomeIcon icon={faFrown} />
                <h4>Your Basket Is Empty</h4>
              </div>
            )}
          </div>
          <div className="paypal_button_container">
            <Paypal
              show={this.state.showTotal}
              toPay={this.state.total}
              transactionError={(data) => this.transactionError(data)}
              transactionCanceled={(data) => this.transactionCanceled(data)}
              onSuccess={(data) => this.transactionSuccess(data)}
            />
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Cart);
