var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

var auth = require('../../middleware/auth');

var User = require('../../models/User');
var Post = require('../../models/Post');
var Profile = require('../../models/Profile');

// ADD POST
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    }

    var user = await User.findById(req.user.id).select('-password');
    if (!user) res.send(404).json({ msg: 'User not found' });

    var newPost = new Post({
      user: user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    });

    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).send('Server error: ', error);
    }
  }
);

// GET ALL POSTS
router.get('/', auth, async (req, res) => {
  var posts = await Post.find().sort({ date: -1 });
  if (!posts) res.status(404).json({ msg: 'No posts' });

  try {
    res.json(posts);
  } catch (error) {
    res.status(500);
  }
});

// GET POST BY ID
router.get('/:post_id', auth, async (req, res) => {
  var post = await Post.findById(req.params.post_id);
  if (!post) res.status(404).json({ msg: 'Post not found' });

  try {
    res.json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500);
  }
});

// DELETE POST BY ID
router.delete('/:post_id', auth, async (req, res) => {
  var post = await Post.findById(req.params.post_id);
  if (!post) res.status(404).json({ msg: 'Post not found' });

  // Check user
  if (String(post.user) !== req.user.id) {
    res.status(401).json({ msg: 'Not authorized!' });
  }

  try {
    await post.remove();
    res.json({ msg: 'Post deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500);
  }
});

// ADD LIKE
router.put('/likes/:post_id', auth, async (req, res) => {
  var post = await Post.findById(req.params.post_id);
  if (!post) res.status(404).json({ msg: 'Post not found' });

  var curentUsersId = req.user.id,
    alredyLiked = false;

  post.likes.map(
    like => (alredyLiked = like.user.toString() === curentUsersId)
  );

  if (alredyLiked) return res.status(401).json({ msg: 'Alredy liked' });

  post.likes.unshift({ user: curentUsersId });

  try {
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.status(500).send('Server error: ', error);
  }
});

// REMOVE LIKE
router.delete('/likes/:post_id', auth, async (req, res) => {
  var post = await Post.findById(req.params.post_id),
    curentUsersId = req.user.id;
  if (!post) res.status(404).json({ msg: 'Post not found' });

  post.likes = post.likes.filter(
    like => like.user.toString() !== curentUsersId
  );

  try {
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).send('Server error: ', error);
  }
});

// ADD COMMENT
router.post(
  '/comment/:post_id',
  [
    auth,
    [
      check('text', 'Text is required in comment')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) res.json({ errors: errors.array() });

    var post = await Post.findById(req.params.post_id);
    var user = await User.findById(req.user.id);

    var comment = {
      user: user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    };

    post.comments.unshift(comment);

    try {
      await post.save();
      res.status(201).json(post.comments);
    } catch (error) {
      res.status(500).send('Server error: ', error);
    }
  }
);

// REMOVE COMMENT
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  var post = await Post.findById(req.params.post_id);
  if (!post) res.status(401).json({ msg: 'Post not found' });

  post.comments = post.comments.filter(
    comment => comment.id.toString() !== req.params.comment_id
  );

  try {
    await post.save();
    res.json({ msg: 'Comment deleted' });
  } catch (error) {
    res.status(500).send('Server error: ', error);
  }
});

module.exports = router;
