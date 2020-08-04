const router = require('express').Router();
const auth = require('../middleware/auth');
const Brand = require('../models/brand');
const timeout = require('connect-timeout');
const Wood = require('../models/wood');
const Product = require('../models/product');
const admin = require('../middleware/admin');
const monoose = require('mongoose');

// ADD NEW BRAND
router.post('/brand', auth, admin, async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.status(200).json({ success: true, brand: doc });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// GET ALL BRANDS
router.get('/get_brands', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ADD NEW WOOD
router.post('/wood', auth, admin, async (req, res) => {
  const wood = new Wood(req.body);
  try {
    const doc = await wood.save();
    res.status(200).json({ success: true, wood: doc });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// GET ALL THE WOODS
router.get('/get_woods', async (req, res) => {
  try {
    const woods = await Wood.find();
    res.status(200).send(woods);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ADD GUITAR
router.post('/article', auth, admin, async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(200).json({ success: true, article: doc });
  } catch (error) {
    res.json({ success: false, msg: error });
  }
});

// SEARCH DB FOR PRODUCTS BASED ON SOLD,_ID & ...
router.get('/articles_by_id', timeout('5s'), async (req, res) => {
  const type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    const ids = items.split(',');
    items = [];
    items = ids.map((item) => {
      return monoose.Types.ObjectId(item);
    });
  }

  try {
    const products = await Product.find({ _id: { $in: items } })
      .populate('brand')
      .populate('wood');

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/articles_by', async (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const order = req.query.order ? req.query.order : 'asc';
  const limit = req.query.limit ? parseInt(req.query.limit) : 50;

  try {
    const docs = await Product.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit);

    res.send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PRODUCTS FOR SHOP
router.post('/shop', async (req, res) => {
  const { filters } = req.body;
  const order = req.body.order ? req.body.order : 'desc';
  const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  const limit = req.body.limit ? parseInt(req.body.limit) : 50;
  const skip = parseInt(req.body.skip);
  const findArgs = {};

  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: filters[key][0],
          $lte: filters[key][1],
        };
      } else {
        findArgs[key] = filters[key];
      }
    }
  }

  findArgs['publish'] = true;

  try {
    const articles = await Product.find(findArgs)
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    res.status(200).json({ articles, size: articles.length });
  } catch (error) {
    res.status(400).send('Somthing went wrong');
  }
});

module.exports = router;
