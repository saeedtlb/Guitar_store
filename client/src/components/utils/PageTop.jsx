import React from 'react';

const PageTop = ({ title }) => {
  return (
    <div className="page_top">
      <div className="container">{title}</div>
    </div>
  );
};

export default PageTop;
