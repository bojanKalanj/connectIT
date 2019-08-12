const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) res.status(401).json({ msg: 'No profile for this user' });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).send('Server error: ', error);
  }
});

module.exports = router;
