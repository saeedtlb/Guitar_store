import { GET_SITE_DATA, UPDATE_SITE_INFO } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload,
      };
    case UPDATE_SITE_INFO:
      return {
        ...state,
        siteInfo: action.payload.siteInfo,
      };
    default:
      return state;
  }
};
