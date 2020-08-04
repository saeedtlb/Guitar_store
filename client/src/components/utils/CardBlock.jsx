import React from 'react';

import Card from './Card.jsx';

const CardBlock = (props) => {
  const renderCards = (card) =>
    card ? card.map((item, i) => <Card {...item} key={i} />) : null;

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <h3 className="title">{props.title}</h3> : null}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderCards(props.product)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
