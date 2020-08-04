import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import {
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
} from '../actions/types';

export const getProductDetail = async (id) => {
  const { data } = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`
  );

  return {
    type: GET_PRODUCT_DETAIL,
    payload: data[0],
  };
};

export const clearProductDetail = () => ({
  type: CLEAR_PRODUCT_DETAIL,
  payload: '',
});

export const getProductsBy = async (type) => {
  const { data } = await axios.get(
    `${PRODUCT_SERVER}/articles_by?sortBy=${type}&order=desc&limit=4`
  );

  return {
    type: type === 'sold' ? GET_PRODUCT_BY_SELL : GET_PRODUCT_BY_ARRIVAL,
    payload: data,
  };
};

export const get_brands = async () => {
  const { data } = await axios.get(`${PRODUCT_SERVER}/get_brands`);

  return {
    type: GET_BRANDS,
    payload: data,
  };
};

export const add_brand = async (dataToSubmit, existingBrands) => {
  const { data } = await axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit);

  const brands = [...existingBrands, data.brand];

  return {
    type: ADD_BRAND,
    payload: {
      success: data.success,
      brands,
    },
  };
};

export const get_woods = async () => {
  const { data } = await axios.get(`${PRODUCT_SERVER}/get_woods`);

  return {
    type: GET_WOODS,
    payload: data,
  };
};

export const add_wood = async (dataToSubmit, existingwoods) => {
  const { data } = await axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit);

  const woods = [...existingwoods, data.wood];

  return {
    type: ADD_WOOD,
    payload: {
      success: data.success,
      woods,
    },
  };
};

export const getProductsToShop = async (
  limit,
  skip,
  filters = [],
  currentState = []
) => {
  const dataToSubmit = {
    limit,
    skip,
    filters,
  };

  const { data } = await axios.post(`${PRODUCT_SERVER}/shop`, dataToSubmit);
  const newState = [...currentState, ...data.articles];

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: {
      size: data.size,
      articles: newState,
    },
  };
};

export const addProduct = async (dataToSubmit) => {
  const { data } = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit);

  return {
    type: ADD_PRODUCT,
    payload: data,
  };
};

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: '',
  };
};
