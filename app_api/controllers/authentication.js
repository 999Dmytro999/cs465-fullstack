const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

const register = async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = new User({ name: name, email: email });
    user.setPassword(password);
    await user.save();

    return res.status(201).json({ token: user.generateJwt() });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
      message: 'Unable to register the user.',
      error: err.message
    });
  }
};

const login = (req, res, next) => {
  const email = String(req.body.email || '').trim();
  const password = String(req.body.password || '');

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info?.message || 'Invalid email or password.' });
    }

    return res.status(200).json({ token: user.generateJwt() });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
