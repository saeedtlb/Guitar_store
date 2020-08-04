import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';

import MyButton from './button';

class Card extends Component {
  renderCardImage = (image) => {
    if (image.length) {
      return image[0].url;
    } else {
      return '/images/image_not_availble.png';
    }
  };

  render() {
    const { props } = this;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`,
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}

          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyle={{
                  margin: '10px 0 0',
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  this.props.user.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : this.props.history.push('/register_login');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

export default connect(mapStateToProps)(Card);
