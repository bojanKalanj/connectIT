import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

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