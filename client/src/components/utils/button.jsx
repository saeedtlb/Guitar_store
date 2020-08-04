import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid';

const MyButton = ({ type, linkTo, addStyle, title, altClass, runAction }) => {
  const [color, setColor] = useState('#c3c0b1');
  const [background, setBackground] = useState('#f8f8f8');

  const mouseOut = () => {
    setBackground('#f8f8f8');
    setColor('#c3c0b1');
  };

  const mouseIn = () => {
    setBackground('#aaa');
    setColor('#fff');
  };

  const buttons = () => {
    let template = '';
    switch (type) {
      case 'default':
        template = (
          <Link
            className={!altClass ? 'link_default' : altClass}
            to={linkTo}
            style={{ color, background, ...addStyle }}
            onMouseEnter={() => mouseIn()}
            onMouseLeave={() => mouseOut()}
          >
            {title}
          </Link>
        );
        break;
      case 'bag_link':
        template = (
          <button
            className="bag_link"
            onClick={() => runAction()}
            onMouseEnter={() => mouseIn()}
            onMouseLeave={() => mouseOut()}
            style={{ color, background }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        );
        break;
      case 'add_to_cart_link':
        template = (
          <button onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to cart
          </button>
        );
        break;
      default:
        template = '';
    }

    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

export default MyButton;
