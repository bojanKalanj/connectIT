import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCES,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../util/setAuthToken';

// LOAD USER
export const loadUser = () => async dispatch => {
  // Set header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // Get user
    var res = await axios.get('/api/auth');

    // Dispatch user
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER
export const register = ({ name, email, password }) => async dispatch => {
  var config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };

  var body = JSON.stringify({
    name,
    email,
    password
  });

  try {
    var res = await axios.post('http://localhost:5000/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCES,
      payload: res.data
    });
  } catch (error) {
    var errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
