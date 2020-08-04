import React, { Component } from 'react';

import PageTop from '../utils/PageTop.jsx';
import CollapsedCheckBox from '../utils/CollapsedCheckBox.jsx';
import CollapsedRadio from '../utils/CollapsedRadio.jsx';
import { frets, price } from '../utils/Form/fixed_categories';
import LoadMoreCards from './LoadMoreCards.jsx';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/fontawesome-free-solid';

// REDUX
import { connect } from 'react-redux';
import {
  get_brands,
  get_woods,
  getProductsToShop,
} from '../../actions/product_actions';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: '',
      limit: 6,
      skip: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
      },
    };
  }

  componentDidMount() {
    const { filters, skip, limit } = this.state;
    this.props.dispatch(get_brands());
    this.props.dispatch(get_woods());
    this.props.dispatch(getProductsToShop(limit, skip, filters));
  }

  handleFileters = (filters, category) => {
    const { filters: newFilters } = { ...this.state };
    newFilters[category] = filters;

    if (category === 'price') {
      let array = [];

      for (let key in price) {
        if (parseInt(filters) === price[key]._id) {
          array = [...price[key].array];
        }
      }
      newFilters['price'] = array;
    }

    this.showFilteredResult(newFilters);

    this.setState({ filters: newFilters });
  };

  showFilteredResult = (filter) => {
    const { limit } = this.state;
    this.props.dispatch(getProductsToShop(limit, 0, filter));
    this.setState({ skip: 0 });
  };

  loadMoreCards = () => {
    const { limit, filters } = this.state;
    const skip = this.state.skip + limit;

    this.props.dispatch(
      getProductsToShop(limit, skip, filters, this.props.products.toShop)
    );

    this.setState({ skip });
  };

  handleGrid = () => {
    this.setState((prvState) => {
      return {
        grid: prvState.grid ? '' : 'grid_bars',
      };
    });
  };

  render() {
    return (
      <div>
        <PageTop title="Browse Product" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapsedCheckBox
                initState={true}
                title="Brands"
                list={this.props.products.brands}
                handleFileters={(filters) =>
                  this.handleFileters(filters, 'brand')
                }
              />

              <CollapsedCheckBox
                initState={false}
                title="Frets"
                list={frets}
                handleFileters={(filters) =>
                  this.handleFileters(filters, 'frets')
                }
              />

              <CollapsedCheckBox
                initState={false}
                title="Woods"
                list={this.props.products.woods}
                handleFileters={(filters) =>
                  this.handleFileters(filters, 'wood')
                }
              />

              <CollapsedRadio
                initState={true}
                title="Price"
                list={price}
                handleFileters={(filters) =>
                  this.handleFileters(filters, 'price')
                }
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>

                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product,
  };
};

export default connect(mapStateToProps)(Shop);
