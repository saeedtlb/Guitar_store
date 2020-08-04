import React, { Component } from 'react';

// FORM
import FormFiels from '../utils/Form/FormFiels.jsx';
import { update, generateData, populateFields } from '../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import { updateUserData, clearUserData } from '../../actions/user_actions';

class UpdatePresonalInfo extends Component {
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
      },
    };
  }

  componentDidMount() {
    const newFromData = populateFields(
      this.state.formdata,
      this.props.user.userData
    );

    this.setState({
      formdata: newFromData,
    });
  }

  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, 'update_user');
    this.setState({
      formdata: newFormdate,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [formIsValid, dataToSubmit] = generateData(
      this.state.formdata,
      'update_user'
    );

    if (formIsValid) {
      this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
        if (this.props.user.updateUser) {
          this.setState({ formSuccess: true }, () => {
            this.props.dispatch(clearUserData());
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
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
        </div>

        <div className="bottom">
          <div className="block">
            <FormFiels
              id="email"
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
        </div>

        {this.state.formSuccess ? (
          <div className="success_label">Successd</div>
        ) : null}

        {this.state.formError ? (
          <div className="error_label">{this.state.formErrorMessage}</div>
        ) : null}

        <button onClick={(e) => this.submitForm(e)}>Update info</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UpdatePresonalInfo);
