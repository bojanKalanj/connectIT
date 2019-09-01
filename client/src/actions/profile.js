import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
  GET_GITHUB_REPO,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';

// GET ALL PROFILES
export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    var res = await axios.get('http://localhost:5000/api/profile');

    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// GET PROFILE BY USER ID
export const getProfileById = user_id => async dispatch => {
  try {
    var res = await axios.get(
      `http://localhost:5000/api/profile/user/${user_id}`
    );
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

// GET USER REPOS FROM GITHUB
export const getUserRepoFromGithub = username => async dispatch => {
  try {
    var repo = await axios.get(
      `http://localhost:5000/api/profile/github/${username}`
    );
    dispatch({
      type: GET_GITHUB_REPO,
      payload: repo.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { msg: 'err.response.statusText, status: err.response.status' }
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
      payload: {
        msg: 'error.response.statusText, status: error.response.status'
      }
    });
  }
};

// ADD EXPERIENCE
export const addExperience = (expData, history) => async dispatch => {
  try {
    var config = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

    var res = await axios.put(
      'http://localhost:5000/api/profile/experience',
      expData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    history.push('/dashboard');
  } catch (error) {
    // var errors = error.response.data.errors;
    // if (errors) {
    //   console.log(errors);
    //   errors.forEach(error => {
    //     dispatch(setAlert(error.msg, 'danger'));
    //   });
    // }
    console.log(error);
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: {
        msg: 'error.response.statusText, status: error.response.status'
      }
    });
  }
};

// DELETE EXPERIENCE
export const deleteExperience = expId => async dispatch => {
  try {
    var res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${expId}`
    );

    dispatch(setAlert('Experience removed', 'succes'));
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert('Error'));
  }
};

// ADD EDUCATION
export const addEducation = (expData, history) => async dispatch => {
  try {
    var config = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

    var res = await axios.post(
      'http://localhost:5000/api/profile/education',
      expData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education added'));
    history.push('/dashboard');
  } catch (error) {
    var errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: {
        msg: 'error.response.statusText, status: error.response.status'
      }
    });
  }
};

// DELETE EDUCATION
export const deleteEducation = eduID => async dispatch => {
  try {
    var res = await axios.delete(
      `http://localhost:5000/api/profile/education/${eduID}`
    );
    dispatch(setAlert('Education removed', 'success'));
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
