import axios from 'axios';
import { GET_POSTS, POST_ERROR, ADD_POST } from './types';
import { setAlert } from './alert';

// GET ALL POSTS
export const getAllPosts = () => async dispatch => {
  try {
    var res = await axios.get('http://localhost:5000/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// DELETE POST BY ID
export const deletePost = postId => async dispatch => {
  try {
    var res = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch(setAlert('Post removed'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// ADD POST
export const addPost = newPost => async dispatch => {
  try {
    var config = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

    var res = await axios.post(
      `http://localhost:5000/api/posts/`,
      newPost,
      config
    );
    dispatch(setAlert('Post added'));
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
