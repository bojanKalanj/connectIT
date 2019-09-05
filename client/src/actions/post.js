import axios from 'axios';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_LIKES
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
// router.get('/:post_id', auth, async (req, res) => {
//     var post = await Post.findById(req.params.post_id);
//     if (!post) res.status(404).json({ msg: 'Post not found' });

//     try {
//       res.json(post);
//     } catch (error) {
//       if (error.kind === 'ObjectId') {
//         res.status(404).json({ msg: 'Post not found' });
//       }
//       res.status(500);
//     }
//   });
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
// router.put('/likes/:post_id', auth, async (req, res) => {
//   var post = await Post.findById(req.params.post_id);
//   if (!post) res.status(404).json({ msg: 'Post not found' });

//   var curentUsersId = req.user.id,
//     alredyLiked = false;

//   post.likes.map(
//     like => (alredyLiked = like.user.toString() === curentUsersId)
//   );

//   if (alredyLiked) return res.status(401).json({ msg: 'Alredy liked' });

//   post.likes.unshift({ user: curentUsersId });

//   try {
//     await post.save();
//     res.status(200).json(post.likes);
//   } catch (error) {
//     res.status(500).send('Server error: ', error);
//   }
// });
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
