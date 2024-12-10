const mongoose = require('mongoose');

const stockDamageSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  damage: {
    type: String,
    required: true,
  },
});

const StockDamage = mongoose.model('StockDamage', stockDamageSchema);

module.exports = StockDamage;
