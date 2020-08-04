import axios from 'axios';
import { SITE_SERVER } from '../components/utils/misc';
import { GET_SITE_DATA, UPDATE_SITE_INFO } from './types';

export const getSiteData = async () => {
  const { data } = await axios.get(`${SITE_SERVER}/site_data`);

  return {
    type: GET_SITE_DATA,
    payload: data,
  };
};

export const updateSiteInfo = (info) => {
  let result = '';

  if (info) {
    result = axios
      .post(`${SITE_SERVER}/site_info_update`, info)
      .then((res) => res.data);
  }

  return {
    type: UPDATE_SITE_INFO,
    payload: result,
  };
};
