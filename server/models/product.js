const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      minlength: 10,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    wood: {
      type: Schema.Types.ObjectId,
      ref: 'Wood',
      required: true,
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    available: {
      required: true,
      type: Boolean,
    },
    frets: {
      required: true,
      type: Number,
    },
    sold: {
      type: Number,
      maxlength: 10,
      default: 0,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
