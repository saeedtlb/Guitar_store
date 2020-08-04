import React, { Component } from 'react';

// FORM
import FormFiels from '../utils/Form/FormFiels.jsx';
import { update, generateData } from '../utils/Form/formAction';

// REDUX ACTION
import { resetPassword } from '../../actions/user_actions';

// MATERIAL UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetToken: '',
      formError: false,
      formErrorMessage: '',
      formSuccess: false,
      formdata: {
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Please enter your new password...',
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

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, 'reset_pass');
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'reset_pass'
    );

    if (formIsValid) {
      this.props
        .dispatch(
          resetPassword({ ...dataToSubmit, token: this.state.resetToken })
        )
        .then((res) => {
          if (res.payload.success) {
            this.setState({ formError: false, formSuccess: true });
            setTimeout(() => {
              this.setState({ formSuccess: false });
              this.props.history.push('/register_login');
            }, 3000);
          } else {
            this.setState({
              formError: true,
              formErrorMessage: res.payload.message,
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
        <form onSubmit={this.submitForm}>
          <h2>Reset password</h2>
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
          <div>
            {this.state.formError ? (
              <div className="error_label">{this.state.formErrorMessage}</div>
            ) : null}
            <input type="submit" value="Reset password" />
          </div>
        </form>
        <Dialog
          open={this.state.formSuccess}
          TransitionComponent={this.Transition}
        >
          <div className="dialog_alert">
            <DialogTitle>Reset Successfully</DialogTitle>
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

export default ResetPassword;
