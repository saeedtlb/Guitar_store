import React from 'react';

import Card from './Card.jsx';

const CardBlockShop = ({ grid, products }) => {
  const renderCards = (products) =>
    products.map((card) => <Card key={card._id} {...card} grid={grid} />);

  return (
    <div className={`card_block_shop ${grid ? 'grid_layout' : ''}`}>
      {products ? (
        products.length ? (
          renderCards(products)
        ) : (
          <div className="no_result">Sorry, no results</div>
        )
      ) : null}
    </div>
  );
};

export default CardBlockShop;
