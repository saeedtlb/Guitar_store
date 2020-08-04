import React, { Component } from 'react';

// REDUX
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site_actions';

// COMPONENTS
import Header from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';

class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="page_container">{this.props.children}</div>

        <Footer data={this.props.site.siteData} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps)(Layout);
