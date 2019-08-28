import axios from 'axios';

import { GET_PROFILE, GET_PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    var res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
