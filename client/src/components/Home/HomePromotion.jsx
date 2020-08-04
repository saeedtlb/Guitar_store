import React from 'react';

import MyButton from '../utils/button.jsx';

const HomePromotion = () => {
  return (
    <div className="home_promotion">
      <div
        className="home_promotion_img"
        style={{ background: 'url(/images/featured/featured_home_3.jpg)' }}
      >
        <div className="featured_action">
          <div className="tag title">Up to 40% off</div>
          <div className="tag low_title">In Second hand guitart</div>
          <div>
            <MyButton
              type="default"
              title="Shop now"
              linkTo="/shop"
              addStyle={{
                margin: '10px 0 0',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePromotion;
