const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

// CREATE AND UPDATE PROFILE
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if (errors) {
    //   console.log(errors);
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    var profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      var profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.status(200).json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// GET ALL PROFILES
router.get('/', async (req, res) => {
  try {
    var profiles = await Profile.find({}).populate('user', ['name', 'avatar']);
    res.status(400).json(profiles);
  } catch (error) {
    res.send(error);
  }
});

// GET PROFILE BY USER ID
router.get('/user/:user_id', async (req, res) => {
  try {
    var profile = await Profile.findOne({ user: req.params.user_id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) res.status(404).send({ msg: 'Profile not found' });

    res.status(400).json(profile);
  } catch (error) {
    if (profile == 'ObjectId')
      res.status(404).send({ msg: 'Profile not found' });
    res.send(error);
  }
});

// DELETE PROFILE
router.delete('/user/:user_id', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.params.user_id });
    await User.findOneAndRemove({ _id: req.params.user_id });
    res.json({ msg: 'User removed!' });
  } catch (error) {
    if (profile == 'ObjectId')
      res.status(404).send({ msg: 'Profile not found' });
    res.send(error);
  }
});

// ADD PROFILE EXPERIENCE
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required!')
        .not()
        .isEmpty(),
      check('company', 'Company is required!')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if (errors) res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      var profile = await Profile.findOne({ user: req.user.id });
      if (!profile) res.status(400).send('Profile not found');
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).json({ msg: 'Experience added' });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// DELETE EXPERIENCE
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    var profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      exp => String(exp._id) !== req.params.exp_id
    );
    await profile.save();
    res.status(200).send('experience deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
