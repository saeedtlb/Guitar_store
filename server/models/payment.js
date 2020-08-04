const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
});

const payment = mongoose.model('Payment', paymentSchema);

module.exports = payment;
