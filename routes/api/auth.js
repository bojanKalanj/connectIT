const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const tokenSecret = config.get('jwtSecret');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log('req.user.id: ', req.user.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// LOGIN
router.post(
  '/',
  [
    check('email', 'Email required!')
      .not()
      .isEmpty()
      .isEmail(),
    check('password', 'Password required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials. User not found' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials. User not found' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.log('Server error', error);
    }
  }
);

module.exports = router;
