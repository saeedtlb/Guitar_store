import React from 'react';

import CardBlockShop from '../utils/CardBlockShop.jsx';

const LoadMoreCards = ({ grid, products, loadMore, size, limit }) => {
  return (
    <>
      <div>
        <CardBlockShop grid={grid} products={products} />
      </div>

      {size > 0 && size >= limit ? (
        <div className="load_more_container">
          <button onClick={() => loadMore()}>Load More</button>
        </div>
      ) : null}
    </>
  );
};

export default LoadMoreCards;
