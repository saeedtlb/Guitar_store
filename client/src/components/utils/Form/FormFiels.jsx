import React from 'react';

const FormFiels = ({ id, formdata, change }) => {
  const showError = () => {
    let errMessage = null;

    if (formdata.validation && !formdata.valid) {
      errMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }

    return errMessage;
  };

  const renderOptions = (options) =>
    options
      ? options.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))
      : '';

  const renderTemplate = () => {
    let template = null;
    switch (formdata.element) {
      case 'input':
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <input
              className={formdata.validationMessage && 'input_error'}
              value={formdata.value}
              {...formdata.config}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <select
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {renderOptions(formdata.config.options)}
            </select>
            {showError()}
          </div>
        );
        break;
      case 'textarea':
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <textarea
              value={formdata.value}
              {...formdata.config}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        template = null;
    }

    return template;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFiels;
