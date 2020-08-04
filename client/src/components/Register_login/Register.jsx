import React, { Component } from 'react';

// FORM
import FormFiels from '../utils/Form/FormFiels.jsx';
import { update, generateData } from '../utils/Form/formAction';

// MATERIAL UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

// REDUX
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formErrorMessage: '',
      formSuccess: false,
      formdata: {
        name: {
          element: 'input',
          value: '',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Please enter your name',
            autoComplete: 'off',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            name: 'lastName_input',
            type: 'text',
            placeholder: 'Please enter your last name',
            autoComplete: 'off',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
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
        confirmPassword: {
          element: 'input',
          value: '',
          config: {
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password...',
          },
          validation: {
            required: true,
            confirm: 'password',
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
      },
    };
  }

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, 'register');
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'register'
    );

    if (formIsValid) {
      try {
        const res = await this.props.dispatch(registerUser(dataToSubmit));
        if (res.payload.success) {
          this.setState({
            formError: false,
            formSuccess: true,
          });
          setTimeout(() => {
            this.props.history.push('/register_login');
          }, 3000);
        } else {
          this.setState({
            formError: true,
            formErrorMessage: res.payload.message,
          });
        }
      } catch (error) {
        this.setState({ formError: true });
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
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <form onSubmit={(e) => this.submitForm(e)}>
              <div className="top">
                <h2>personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormFiels
                      id="name"
                      formdata={this.state.formdata.name}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>

                  <div className="block">
                    <FormFiels
                      id="lastname"
                      formdata={this.state.formdata.lastname}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  <div className="block">
                    <FormFiels
                      id="email"
                      formdata={this.state.formdata.email}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="bottom">
                <h2>verify your password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormFiels
                      id="password"
                      formdata={this.state.formdata.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>

                  <div className="block">
                    <FormFiels
                      id="confirmPassword"
                      formdata={this.state.formdata.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              {this.state.formError ? (
                <div className="error_label">{this.state.formErrorMessage}</div>
              ) : null}
              <button onClick={(e) => this.submitForm(e)}>
                create an account
              </button>
            </form>
          </div>
        </div>
        <Dialog
          open={this.state.formSuccess}
          TransitionComponent={this.Transition}
        >
          <div className="dialog_alert">
            <DialogTitle>Congradulations!!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will return to log in page in a few seconds
              </DialogContentText>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
