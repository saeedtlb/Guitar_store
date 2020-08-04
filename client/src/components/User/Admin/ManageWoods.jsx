import React, { Component } from 'react';

import FormFiels from '../../utils/Form/FormFiels.jsx';
import { generateData, update, resetFields } from '../../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import { get_woods, add_wood } from '../../../actions/product_actions';

class ManageWoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formSuccess: false,
      formErrorMessage: '',
      formdata: {
        name: {
          element: 'input',
          value: '',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Please enter the wood name',
            autoComplete: 'off',
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

  componentDidMount() {
    this.props.dispatch(get_woods());
  }

  showCategoryItems = () =>
    this.props.woods
      ? this.props.woods.map((wood) => (
          <li key={wood._id} className="category_item">
            {wood.name}
          </li>
        ))
      : null;

  updateForm = (element) => {
    const formdata = update(element, this.state.formdata, 'add wood');

    this.setState({ formdata });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [validData, dataToSubmit] = generateData(
      this.state.formdata,
      'add wood'
    );

    if (validData) {
      const res = await this.props.dispatch(
        add_wood(dataToSubmit, this.props.woods)
      );

      if (res.payload.success) {
        const formdata = resetFields(this.state.formdata, 'add wood');
        this.setState({
          formdata,
          formError: false,
          formErrorMessage: '',
          formSuccess: true,
        });
        this.props.dispatch(get_woods());
        setTimeout(() => {
          this.setState({ formSuccess: false });
        }, 2000);
      } else {
        this.setState({
          formError: true,
          formErrorMessage: 'Somthing went wrong',
        });
      }
    } else {
      this.setState({
        formError: true,
        formErrorMessage: 'Please enter the wood name',
      });
    }
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <ul className="brands_container">{this.showCategoryItems()}</ul>
          </div>
          <div className="right">
            <form>
              <FormFiels
                id="name"
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formSuccess ? (
                <div className="success_label">Added Successfully</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">{this.state.formErrorMessage}</div>
              ) : null}

              <button onClick={(e) => this.submitForm(e)}>add wood</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  woods: store.product.woods,
});

export default connect(mapStateToProps)(ManageWoods);
