const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

require('dotenv').config();

const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    maxlength: 255,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 255,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExp: {
    type: Number,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(SALT_I);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const validPass = await bcrypt.compare(candidatePassword, this.password);
  if (!validPass) return { loginSuccess: false, msg: 'Wrong Password' };

  return { loginSuccess: true, msg: 'Logged In' };
};

userSchema.methods.generateResetToken = function (cb) {
  crypto.randomBytes(20, (err, buffer) => {
    const token = buffer.toString('hex');

    const d = new Date();
    d.setDate(d.getDate() + 1);
    const tommorow = d.getTime();

    this.resetToken = token;
    this.resetTokenExp = tommorow;

    this.save((err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(this._id.toHexString(), process.env.SECRET_TOKEN);
  this.token = token;

  const user = await this.save();
  return user;
};

userSchema.statics.findByToken = async function (token) {
  const decode = jwt.verify(token, process.env.SECRET_TOKEN);

  const user = await this.findOne({ _id: decode, token: token });
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
