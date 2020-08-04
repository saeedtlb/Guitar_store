import React from 'react';

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid';

const NotFound = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>Oops!! Page Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
