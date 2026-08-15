const crypto = require('crypto');
const mongoose = require('mongoose');
const { signToken } = require('../config/jwt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const candidate = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512');
  const stored = Buffer.from(this.hash, 'hex');

  return candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
};

userSchema.methods.generateJwt = function() {
  return signToken({
    _id: this._id,
    email: this.email,
    name: this.name
  });
};

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');
