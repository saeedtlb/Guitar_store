import React, { Component } from 'react';

import HomeSlider from './HomeSlider.jsx';
import HomePromotion from './HomePromotion.jsx';
import CardBlock from '../utils/CardBlock.jsx';

// REDUX
import { connect } from 'react-redux';
import { getProductsBy } from '../../actions/product_actions';

class Home extends Component {
  async componentDidMount() {
    await this.props.dispatch(getProductsBy('sold'));
    await this.props.dispatch(getProductsBy('createdAt'));
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          product={this.props.product.bySell}
          title="Best Selling guitars"
        />
        <HomePromotion />
        <CardBlock
          product={this.props.product.byArrival}
          title="New Arrivals"
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.product,
  };
};

export default connect(mapStateToProps)(Home);
