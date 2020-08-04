const validate = (form = [], element) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const errMessage = valid ? '' : 'Email is invalid';
    error = valid ? error : [valid, errMessage];
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === form[element.validation.confirm].value;
    const errMessage = valid ? '' : 'Passwords Not Match';
    error = valid ? error : [valid, errMessage];
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const errMessage = valid ? '' : 'This field is required';
    error = valid ? error : [valid, errMessage];
  }

  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = { ...formdata };
  const newElement = { ...newFormdata[element.id] };

  newElement.value = element.event.target.value;

  if (element.blur) {
    const validData = validate(newFormdata, newElement);
    [newElement.valid, newElement.validationMessage] = validData;
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formdata, formName) => {
  const data = {};
  let valid = true;

  for (let key in formdata) {
    if (key !== 'confirmPassword') data[key] = formdata[key].value;
    valid = formdata[key].valid && valid;
  }

  return [valid, data];
};

export const populatedOptionFields = (options, category, formdata) => {
  const newFormdata = { ...formdata };
  const newArray = [];
  options.forEach((item) => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormdata[category].config.options = newArray;

  return newFormdata;
};

export const resetFields = (formdata, formName) => {
  const newFormdata = { ...formdata };

  for (let key in newFormdata) {
    key === 'images'
      ? (newFormdata[key].value = [])
      : (newFormdata[key].value = '');

    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = '';
  }

  return newFormdata;
};

export const populateFields = (formdata, userData) => {
  const newFormdata = { ...formdata };

  for (let key in newFormdata) {
    newFormdata[key].value = userData[key];
    newFormdata[key].valid = true;
    newFormdata[key].touched = true;
    newFormdata[key].validationMessage = '';
  }

  return newFormdata;
};
