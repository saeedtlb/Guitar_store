import React from 'react';

import MyButton from '../utils/button.jsx';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

const ProductInfo = ({ detail, addToCart }) => {
  const showTags = ({ shipping, available }) => (
    <div className="product_tags">
      {shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      <div className="tag">
        <div>
          <FontAwesomeIcon icon={available ? faCheck : faTimes} />
        </div>
        <div className="tag_text">
          {available ? (
            <>
              <div>Available</div>
              <div>in store</div>
            </>
          ) : (
            <>
              <div>Not Available</div>
              <div>Preorder only</div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const showActions = ({ price }) => (
    <div className="product_actions">
      <div className="price">$ {price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => addToCart(detail._id)}
        />
      </div>
    </div>
  );

  const showSpecification = ({ frets, wood }) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {frets}
        </div>

        <div className="item">
          <strong>wood:</strong> {wood.name}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showTags(detail)}
      {showActions(detail)}
      {showSpecification(detail)}
    </div>
  );
};

export default ProductInfo;
