import axios from 'axios';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_LIKES,
  ADD_COMMENT
} from './types';
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
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
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

// GET POST BY ID
export const getPost = postId => async dispatch => {
  try {
    var res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
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

// ADD LIKE
export const addLike = postId => async dispatch => {
  try {
    var res = await axios.put(
      `http://localhost:5000/api/posts/likes/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.log(error);
  }
};

// REMOVE LIKE
export const removeLike = postId => async dispatch => {
  console.log(postId);
  try {
    var res = await axios.delete(
      `http://localhost:5000/api/posts/likes/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.log(error);
  }
};

// ADD COMMENT
export const addComment = (postId, formData) => async dispatch => {
  var config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };

  try {
    var res = await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR
      // payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// REMOVE COMMENT
// router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
//   var post = await Post.findById(req.params.post_id);
//   if (!post) res.status(401).json({ msg: 'Post not found' });

//   post.comments = post.comments.filter(
//     comment => comment.id.toString() !== req.params.comment_id
//   );

//   try {
//     await post.save();
//     res.json({ msg: 'Comment deleted' });
//   } catch (error) {
//     res.status(500).send('Server error: ', error);
//   }
// });

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );

    dispatch(setAlert('Comment deleted', 'success'));
  } catch (error) {}
};
