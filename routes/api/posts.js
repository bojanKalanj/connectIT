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

module.exports = router;
