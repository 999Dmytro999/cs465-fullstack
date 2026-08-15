const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Invalid email or password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
