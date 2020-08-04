import React, { useState, useEffect } from 'react';

const ProductImages = ({ detail }) => {
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    const lighbox = [];

    if (detail.images.length > 0) {
      detail.images.map((image) => {
        return lighbox.push(image.url);
      });

      setLightboxImages(lighbox);
    }
  }, [detail.images]);

  const renderImage = (image) => {
    if (image.length > 0) {
      return image[0].url;
    } else {
      return '/public/images/image_not_availble.png';
    }
  };

  const handleLightBox = () => {};

  const showThumbs = () =>
    lightboxImages.map((image, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => handleLightBox(i)}
          style={{ background: `url(${image}) no-repeat` }}
          className="thumb"
        />
      ) : null
    );

  return (
    <div className="product_image_container">
      <div className="main_pic">
        <div
          style={{ background: `url(${renderImage(detail.images)}) no-repeat` }}
          onClick={() => handleLightBox(0)}
        />
      </div>
      <div className="main_thumbs">{showThumbs()}</div>
    </div>
  );
};

export default ProductImages;
