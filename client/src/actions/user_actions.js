import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
  CLEAR_UPDATE_USER_DATA,
  UPDATE_DATA_USER,
  UPLOAD_FILE,
  DOWNLOAD_LINK,
  RESET_PASS,
  RESET_USER,
} from '../actions/types';

export const loginUser = async (dataToSubmit) => {
  const { data } = await axios.post(`${USER_SERVER}/login`, dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const registerUser = async (dataToSubmit) => {
  const { data } = await axios.post(`${USER_SERVER}/register`, dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: data,
  };
};

export const auth = async () => {
  const { data } = await axios.get(`${USER_SERVER}/auth`);

  return {
    type: AUTH_USER,
    payload: data,
  };
};

export const logoutUser = async () => {
  const { data } = await axios.get(`${USER_SERVER}/logout`);

  return {
    type: LOGOUT_USER,
    payload: data,
  };
};

export const resetUser = async (email) => {
  const { data } = await axios.post(`${USER_SERVER}/resetUser`, email);

  return {
    type: RESET_USER,
    payload: data,
  };
};

export const resetPassword = async (dataToSubmit) => {
  const { data } = await axios.post(
    `${USER_SERVER}/reset_password`,
    dataToSubmit
  );

  return {
    type: RESET_PASS,
    payload: data,
  };
};

export const addToCart = async (_id) => {
  const { data } = await axios.post(
    `${USER_SERVER}/addToCart?productId=${_id}`
  );

  return {
    type: ADD_TO_CART_USER,
    payload: data,
  };
};

export const getCartItems = async (cartItems, userCart) => {
  const { data } = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?type=array&id=${cartItems}`
  );

  data.forEach((item, i) => {
    userCart.forEach((id) => {
      if (item._id === id.id) {
        data[i].quantity = id.quantity;
      }
    });
  });

  return {
    type: GET_CART_ITEMS_USER,
    payload: data,
  };
};

export const removeCardItem = async (id) => {
  const request = await axios
    .get(`${USER_SERVER}/removeItem?_id=${id}`)
    .then(({ data }) => {
      data.cart.forEach((item) => {
        data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request,
  };
};

export const onSuccessBuy = async (detail) => {
  const { data } = await axios.post(`${USER_SERVER}/successBuy`, detail);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: data,
  };
};

export const updateUserData = async (dataToSubmit) => {
  const { data } = await axios.post(
    `${USER_SERVER}/update_profile`,
    dataToSubmit
  );

  return {
    type: UPDATE_DATA_USER,
    payload: data,
  };
};

export const clearUserData = () => ({
  type: CLEAR_UPDATE_USER_DATA,
  payload: '',
});

export const uploadFiles = (file, config) => {
  let data = '';
  if (file) {
    data = axios
      .post(`${USER_SERVER}/uploadfile`, file, config)
      .then((res) => res.data);
  }

  return {
    type: UPLOAD_FILE,
    payload: data,
  };
};

export const getDownloadLink = async () => {
  const { data } = await axios.get(`${USER_SERVER}/getDownloadLink`);

  return {
    type: DOWNLOAD_LINK,
    payload: data,
  };
};
