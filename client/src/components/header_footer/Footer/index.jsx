import React from 'react';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faEnvelope,
  faPhone,
  faClock,
} from '@fortawesome/fontawesome-free-solid';

const Footer = ({ data }) => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>{data ? data.address : null}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{data ? data.phone : null}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>{data ? data.hours : null}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{data ? data.email : null}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h2>Be the first to khow</h2>
            <div>
              <p>
                Get all the latest information on events, sales and offers you
                can miss out
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
