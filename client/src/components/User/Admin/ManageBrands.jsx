import React, { Component } from 'react';

import FormFiels from '../../utils/Form/FormFiels.jsx';
import { generateData, update, resetFields } from '../../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import { get_brands, add_brand } from '../../../actions/product_actions';

class ManageBrands extends Component {
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
            placeholder: 'Please enter the brand name',
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
    this.props.dispatch(get_brands());
  }

  showCategoryItems = () =>
    this.props.brands
      ? this.props.brands.map((brand) => (
          <li key={brand._id} className="category_item">
            {brand.name}
          </li>
        ))
      : null;

  updateForm = (element) => {
    const formdata = update(element, this.state.formdata, 'add brand');

    this.setState({ formdata });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [validData, dataToSubmit] = generateData(
      this.state.formdata,
      'add brand'
    );

    if (validData) {
      const res = await this.props.dispatch(
        add_brand(dataToSubmit, this.props.brands)
      );

      if (res.payload.success) {
        const formdata = resetFields(this.state.formdata, 'add brand');
        this.setState({
          formdata,
          formError: false,
          formErrorMessage: '',
          formSuccess: true,
        });
        this.props.dispatch(get_brands());
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
        formErrorMessage: 'Please enter the brand name',
      });
    }
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
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

              <button onClick={(e) => this.submitForm(e)}>add brand</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  brands: store.product.brands,
});

export default connect(mapStateToProps)(ManageBrands);
