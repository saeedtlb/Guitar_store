import React, { Component } from 'react';

import PageTop from '../utils/PageTop.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductImages from './ProductImages.jsx';

// MATERIAL UI
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';
import {
  getProductDetail,
  clearProductDetail,
} from '../../actions/product_actions';

class ProductPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getProductDetail(id)).then((res) => {
      if (!this.props.product.detail) {
        this.props.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id));
  };

  render() {
    return (
      <div>
        <PageTop title="Product detail" />

        <div className="container">
          {this.props.product.detail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: '500px' }}>
                  <ProductImages detail={this.props.product.detail} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  addToCart={(id) => this.addToCartHandler(id)}
                  detail={this.props.product.detail}
                />
              </div>
            </div>
          ) : (
            <CircularProgress thickness={7} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.product,
  };
};

export default connect(mapStateToProps)(ProductPage);
