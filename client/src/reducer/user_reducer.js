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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess,
        userData: action.payload.loginSuccess
          ? action.payload.data
          : state.userData,
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
      };
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS_USER:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
        successBuy: action.payload.success,
      };
    case UPDATE_DATA_USER:
      return {
        ...state,
        updateUser: action.payload,
      };
    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        updateUser: action.payload,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        uploadFile: action.payload.success,
      };
    case DOWNLOAD_LINK:
      return {
        ...state,
        download_link: action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        resetUser: action.payload.success,
      };
    case RESET_PASS:
      return {
        ...state,
        resetPassword: action.payload.success,
      };
    default:
      return state;
  }
};

export default userReducer;
