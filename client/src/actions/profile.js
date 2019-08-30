import axios from 'axios';
import { GET_PROFILE, GET_PROFILE_ERROR } from './types';
import { setAlert } from './alert';

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

// CREATE OR UPDATE PROFILE
export const createProfile = (formData, history, edit) => async dispatch => {
  try {
    var config = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

    var res = await axios.post(
      'http://localhost:5000/api/profile',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    var errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
