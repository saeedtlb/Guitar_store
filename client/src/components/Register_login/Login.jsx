import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import FormFiels from '../utils/Form/FormFiels.jsx';
import { update, generateData } from '../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {
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
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Please enter your password...',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
      },
    };
  }

  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, 'login');
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    // if (event.keyCode !== 13) {
    //   return;
    // }

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'login'
    );

    if (formIsValid) {
      const res = await this.props.dispatch(loginUser(dataToSubmit));
      if (res.payload.loginSuccess) {
        this.props.history.push('/user/dashboard');
      } else {
        this.setState({
          formError: true,
          formErrorMessage: res.payload.message
            ? res.payload.message
            : res.payload,
        });
      }
    } else {
      this.setState({
        formError: true,
        formErrorMessage: 'Please check your data',
      });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(e) => this.submitForm(e)}>
          <FormFiels
            id="email"
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormFiels
            id="password"
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />
          {this.state.formError ? (
            <div className="error_label">{this.state.formErrorMessage}</div>
          ) : null}
          <div style={{ position: 'relative' }}>
            <input
              type="submit"
              onClick={this.submitForm}
              value="log in"
              style={{ width: '40%' }}
            />
            <button
              onClick={() => this.props.history.push('/reset_user')}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                paddingBottom: '0',
                position: 'absolute',
                bottom: '0',
                fontSize: '14px',
                fontWeight: '300',
                textTransform: 'capitalize',
              }}
            >
              Forgot password ?
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
