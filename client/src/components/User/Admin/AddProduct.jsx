import React, { Component } from 'react';

import UserLayout from '../../../HOC/UserLayout.jsx';
import FormFiels from '../../utils/Form/FormFiels.jsx';
import FileUploader from '../../utils/Form/FileUploader.jsx';
import {
  populatedOptionFields,
  generateData,
  update,
  resetFields,
} from '../../utils/Form/formAction';

// REDUX
import { connect } from 'react-redux';
import {
  get_brands,
  get_woods,
  addProduct,
  clearProduct,
} from '../../../actions/product_actions';

const fields = [
  'name',
  'description',
  'price',
  'brand',
  'shipping',
  'available',
  'wood',
  'frets',
  'publish',
];

class AddProduct extends Component {
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
            label: 'Product name',
            name: 'name_input',
            type: 'text',
            placeholder: 'Please enter the name',
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
        description: {
          element: 'textarea',
          value: '',
          config: {
            label: 'Product description',
            name: 'description_input',
            type: 'text',
            placeholder: 'Please enter the description',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        price: {
          element: 'input',
          value: '',
          config: {
            label: 'Product price',
            name: 'price_input',
            type: 'number',
            placeholder: 'Please enter the price',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        brand: {
          element: 'select',
          value: '',
          config: {
            label: 'Product brand',
            name: 'brand_input',
            options: [],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        shipping: {
          element: 'select',
          value: '',
          config: {
            label: 'shipping',
            name: 'shipping',
            options: [
              { key: true, value: 'Yes' },
              { key: false, value: 'No' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        available: {
          element: 'select',
          value: '',
          config: {
            label: 'available',
            name: 'available',
            options: [
              { key: true, value: 'Yes' },
              { key: false, value: 'No' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        wood: {
          element: 'select',
          value: '',
          config: {
            label: 'Wood material',
            name: 'wood',
            options: [],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        frets: {
          element: 'select',
          value: '',
          config: {
            label: 'frets',
            name: 'frets',
            options: [
              { key: 20, value: 20 },
              { key: 21, value: 21 },
              { key: 22, value: 22 },
              { key: 24, value: 24 },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        publish: {
          element: 'select',
          value: '',
          config: {
            label: 'publish',
            name: 'publish_input',
            options: [
              { key: true, value: 'Yes' },
              { key: false, value: 'No' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showLabel: true,
        },
        images: {
          value: [],
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationMessage: '',
          showLabel: false,
        },
      },
    };
  }

  async componentDidMount() {
    //   GET BRANDS
    const brands = await this.props.dispatch(get_brands());
    let newFormData = populatedOptionFields(
      brands.payload,
      'brand',
      this.state.formdata
    );

    this.updateFields(newFormData);

    // GET WOODS

    const woods = await this.props.dispatch(get_woods());
    newFormData = populatedOptionFields(
      woods.payload,
      'wood',
      this.state.formdata
    );

    this.updateFields(newFormData);
  }

  updateFields = (formdata) => this.setState({ formdata });

  updateForm = (element) => {
    const formdata = update(element, this.state.formdata, 'add_product');

    this.setState({ formdata });
  };

  renderFormFields = () =>
    fields.map((field, i) => {
      if (i === 2 || i === 5 || i === 7) {
        return (
          <div key={i}>
            <FormFiels
              id={field}
              formdata={this.state.formdata[field]}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
          </div>
        );
      }

      return (
        <FormFiels
          key={i}
          id={field}
          formdata={this.state.formdata[field]}
          change={(element) => this.updateForm(element)}
        />
      );
    });

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'add_product');

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });

    setTimeout(() => {
      this.setState({ formSuccess: false }, () =>
        this.props.dispatch(clearProduct())
      );
    }, 3000);
  };

  submitForm = async (event) => {
    event.preventDefault();

    const [validData, dataToSubmit] = generateData(
      this.state.formdata,
      'add product'
    );

    if (validData) {
      try {
        const res = await this.props.dispatch(
          addProduct(dataToSubmit, 'add_product')
        );
        if (res.payload.success) {
          this.resetFieldHandler();
        } else {
          this.setState({
            formError: true,
            formErrorMessage: res.payload.msg.errmsg,
          });
        }
      } catch (error) {
        this.setState({
          formError: true,
          formErrorMessage: 'Somthing went wrong',
        });
      }
    } else {
      this.setState({
        formError: true,
        formErrorMessage: 'Please fill all the form',
      });
    }
  };

  imagesHandler = (images) => {
    const newImageData = { ...this.state.formdata.images };

    newImageData.value = images;
    newImageData.valid = true;

    this.setState((prvState) => ({
      formdata: {
        ...prvState.formdata,
        images: newImageData,
      },
    }));
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1 style={{ marginBottom: '10px' }}>Add product</h1>
          <form onSubmit={(e) => this.submitFrom(e)}>
            <FileUploader
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            {this.renderFormFields()}

            {this.state.formSuccess ? (
              <div className="success_label">Added Successfully</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">{this.state.formErrorMessage}</div>
            ) : null}

            <button onClick={(e) => this.submitForm(e)}>add product</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    products: store.product,
  };
};

export default connect(mapStateToProps)(AddProduct);
