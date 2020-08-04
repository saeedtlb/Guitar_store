import React, { Component } from 'react';

// FORM
import FormFiels from '../utils/Form/FormFiels.jsx';
import { update, generateData } from '../utils/Form/formAction';

// REDUX
import { resetUser } from '../../actions/user_actions';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formErrorMessage: '',
      formSuccess: false,
      formdata: {
        email: {
          element: 'input',
          value: '',
          config: {
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
        },
      },
    };
  }

  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, 'reset_user');
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'reset_user'
    );

    if (formIsValid) {
      this.props.dispatch(resetUser(dataToSubmit)).then((res) => {
        if (res.payload.success) {
          this.setState({ formSuccess: true }, () => {
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
          });
        } else {
          this.setState({
            formError: true,
            formErrorMessage: res.payload.message || 'somthing went wrong',
          });
        }
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
      <div className="container">
        <h1>Reset passwords</h1>
        <form onSubmit={this.submitForm}>
          <div className="block">
            <FormFiels
              id="email"
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
          {this.state.formSuccess ? (
            <div className="success_label">Please check your email</div>
          ) : null}
          {this.state.formError ? (
            <div className="error_label">{this.state.formErrorMessage}</div>
          ) : null}
          <input type="submit" value="Send email to reset password" />
        </form>
      </div>
    );
  }
}

export default Reset;
