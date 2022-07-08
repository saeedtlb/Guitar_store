const router = require('express').Router();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const formidable = require('express-formidable');
const timeout = require('connect-timeout');
const async = require('async');
const SHA1 = require('crypto-js/sha1');
const multer = require('multer');

// Node Module
const fs = require('fs');
const path = require('path');

// VALIDATION
const { registerValidation, loginValidation } = require('../validation');

// Models
const Product = require('../models/product');
const Payment = require('../models/payment');
const User = require('../models/user');

// Auth
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// UTILS
const sendMail = require('../utils/mail/index');

require('dotenv').config();

// SETUP CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get('/auth', auth, ({ user }, res) => {
  const { cart, history, role, name, lastname, email } = user;
  res.status(200).json({
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    cart,
    history,
  });
});

// SIGN UP
router.post('/register', async (req, res) => {
  // VALIDATE DATA
  const { value, error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECKING IF USER EXIST
  const emailExist = await User.findOne({ email: value.email });
  if (emailExist) return res.json({ message: 'Email Already Exist' });

  // CREATE NEW USER
  const user = new User(value);

  try {
    const savesUser = await user.save();
    sendMail(savesUser.email, savesUser.name, null, 'welcome').then(() => {
      res.status(200).json({ success: true, user: savesUser.name });
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.post('/login', async (req, res) => {
  // VALIDATE DATA
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    // CHECKING IF EMAIL EXIST
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.json({ loginSuccess: false, message: 'Email Not Found' });

    const match = await user.comparePassword(req.body.password);
    if (!match.loginSuccess)
      return res.json({ loginSuccess: false, message: match.msg });

    // GENERATE TOKEN FOR USER
    const tuser = await user.generateToken();
    res
      .cookie('x_auth', tuser.token)
      .status(200)
      .json({ loginSuccess: true, data: user });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGOUT
router.get('/logout', auth, async ({ user }, res) => {
  try {
    await User.findOneAndUpdate({ _id: user._id }, { token: '' });
    res.status(200).json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// RESET USER
router.post('/resetUser', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) return res.json({ success: false, err });
    user.generateResetToken((err, user) => {
      if (err) return res.json({ success: false, err });
      sendMail(user.email, user.name, null, 'reset_password', user);
      return res.status(200).json({ success: true });
    });
  });
});

// RESET PASS
router.post('/reset_password', (req, res) => {
  User.findOne(
    {
      $and: [
        { resetToken: req.body.token },
        { resetTokenExp: { $gte: Date.now() } },
      ],
    },
    (err, user) => {
      if (err || !user)
        return res.json({
          success: false,
          message: "Can't find user, Your token is incorrect or it has expired",
        });

      if (user.password === req.body.password) {
        return res.json({
          success: false,
          message: 'Please create a new password which you have never used',
        });
      }

      user.password = req.body.password;
      user.resetToken = '';
      user.resetTokenExp = '';

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
      });
    }
  );
});

// ADD PRODUCT IMAGE
router.post('/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    },
    (error, result) => {
      if (error) return res.send(error);

      res.status(200).send({ public_id: result.public_id, url: result.url });
    }
  );
});

router.get('/remove_image', auth, admin, (req, res) => {
  const id = req.query.public_id;

  cloudinary.uploader.destroy(id, (error) => {
    if (error) return res.json({ success: false, error });

    res.status(200).json({ success: true });
  });
});

router.post('/addToCart', auth, async (req, res) => {
  const doc = await User.findOne({ _id: req.user._id });
  let duplicate = false;

  doc.cart.forEach((item) => {
    if (item.id == req.query.productId) {
      duplicate = true;
    }
  });

  if (duplicate) {
    User.findOneAndUpdate(
      {
        _id: req.user._id,
        'cart.id': mongoose.Types.ObjectId(req.query.productId),
      },
      { $inc: { 'cart.$.quantity': 1 } },
      { new: true },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  } else {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            id: mongoose.Types.ObjectId(req.query.productId),
            quantity: 1,
            date: Date.now(),
          },
        },
      },
      { new: true },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json(doc.cart);
      }
    );
  }
});

// REMOVE A PRODUCT FROM CART
router.get(`/removeItem`, auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: { id: mongoose.Types.ObjectId(req.query._id) },
      },
    },
    { new: true },
    (err, doc) => {
      const { cart } = doc;
      const array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate('brand')
        .populate('wood')
        .exec((err, cartDetail) => {
          res.status(200).json({ cart, cartDetail });
        });
    }
  );
});

// PAY WAS SUCCESSFUL
router.post('/successBuy', timeout('5s'), auth, (req, res) => {
  let history = [];
  let transaction = {};

  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
    req.user._id
  )
    .toString()
    .substring(0, 8)}`;

  req.body.cartDetail.forEach((item) => {
    const { _id: id, price, name, brand, quantity } = item;
    history.push({
      dateOfPurchase: Date.now(),
      porder: po,
      id,
      price,
      name,
      brand: brand.name,
      quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  transaction.data = {
    ...req.body.paymentData,
    porder: po,
  };
  transaction.product = history;

  const { _id: id, name, lastname, email } = req.user;
  transaction.user = {
    id,
    name,
    lastname,
    email,
  };

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transaction);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];

        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              { $inc: { sold: item.quantity } },
              { new: false }
            );
            async.setImmediate(() => {
              callback();
            });
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            sendMail(user.email, user.name, null, 'purchase', transaction);
            res.status(200).json({
              success: true,
              cart: [],
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

// CHANGE USER INFO
router.post('/update_profile', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    (err, doc) => {
      if (err) return res.send({ success: false, err });
      res.status(200).json({ success: true });
    }
  );
});

// FUNCTIONALITY FOR UPLOAD FILE(IMAGE)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    const ex = path.extname(file.originalname);
    if (ex !== '.jpg' || ex !== '.png') {
      return cb(res.status(400).end('Just jpg and png'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('file');

router.post('/uploadfile', auth, admin, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    else return res.status(200).json({ success: true });
  });
});

// GET UPLOADED FILE LINK
router.get('/getDownloadLink', auth, admin, (req, res) => {
  const address = path.resolve(`${__dirname}/../../uploads/`);
  fs.readdir(address, (err, file) => {
    if (err) return res.send(err);
    res.status(200).send(file);
  });
});

// DOWNLOAD LINK
router.get('/download/:id', auth, admin, (req, res) => {
  const file = `${path.resolve('.')}/uploads/${req.params.id}`;
  res.status(200).download(file);
});

module.exports = router;
