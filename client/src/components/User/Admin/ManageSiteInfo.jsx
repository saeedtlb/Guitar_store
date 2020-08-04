import React, { Component } from 'react';

// FORM
import FormFiels from '../../utils/Form/FormFiels.jsx';
import {
  update,
  generateData,
  populateFields,
} from '../../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import { getSiteData, updateSiteInfo } from '../../../actions/site_actions';

class ManageSiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formErrorMessage: '',
      formSuccess: false,
      formdata: {
        address: {
          element: 'input',
          value: '',
          config: {
            label: 'Address',
            name: 'address_input',
            type: 'text',
            placeholder: 'Please enter your address',
            autoComplete: 'off',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        hours: {
          element: 'input',
          value: '',
          config: {
            label: 'Working Hours',
            name: 'hour_input',
            type: 'text',
            placeholder: 'Please enter your working hours',
            autoComplete: 'off',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        phone: {
          element: 'input',
          value: '',
          config: {
            label: 'Phone',
            name: 'hour_input',
            type: 'text',
            placeholder: 'Please enter your phone number',
            autoComplete: 'off',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        email: {
          element: 'input',
          value: '',
          config: {
            label: 'Email',
            name: 'email_input',
            type: 'email',
            placeholder: 'Please enter your email...',
            autoComplete: 'off',
          },
          validation: {
            required: true,
            email: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(getSiteData()).then(() => {
      const newFormDate = populateFields(this.state.formdata, this.props.site);
      this.setState({
        formdata: newFormDate,
      });
    });
  }

  updateForm = (element) => {
    const newFormdate = update(
      element,
      this.state.formdata,
      'update_site_info'
    );
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'update_site_info'
    );

    if (formIsValid) {
      this.props.dispatch(updateSiteInfo(dataToSubmit)).then(() => {
        this.setState({ formSuccess: true }, () => {
          this.props.dispatch(updateSiteInfo(false));
          setTimeout(() => {
            this.setState({ formSuccess: false });
          }, 2000);
        });
      });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: 'Please check your data',
      });
    }
  };

  render() {
    return (
      <form onSubmit={(e) => this.submitForm(e)}>
        <div className="block">
          <FormFiels
            id="address"
            formdata={this.state.formdata.address}
            change={(element) => this.updateForm(element)}
          />
        </div>

        <div className="block">
          <FormFiels
            id="hours"
            formdata={this.state.formdata.hours}
            change={(element) => this.updateForm(element)}
          />
        </div>

        <div className="block">
          <FormFiels
            id="phone"
            formdata={this.state.formdata.phone}
            change={(element) => this.updateForm(element)}
          />
        </div>

        <div className="block">
          <FormFiels
            id="email"
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
        </div>

        {this.state.formSuccess ? (
          <div className="success_label">Successd</div>
        ) : null}

        {this.state.formError ? (
          <div className="error_label">{this.state.formErrorMessage}</div>
        ) : null}

        <button onClick={(e) => this.submitForm(e)}>Update</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site.siteData,
});

export default connect(mapStateToProps)(ManageSiteInfo);
