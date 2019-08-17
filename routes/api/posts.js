var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

var auth = require('../../middleware/auth');

var User = require('../../models/User');
var Post = require('../../models/Post');
var Profile = require('../../models/Profile');

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

    try {
      var newPost = new Post({
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).send('Server error: ', error);
    }
  }
);

module.exports = router;
