const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  code:String,
  name: String,
  reference: String,
  password: String,
  contactNo: String,
  currentLimit: Number,
  share: Number,
  cShare: Number,
  icShare: Number,
  mobileShare: Number,
  mc: Number,
  sc: Number,
  cc: Number,
  casinoCheck: Boolean,
  icCheck: Boolean,
  cshare: Number,
});

const ProviderModel = mongoose.model('ProviderModel', yourSchema);

module.exports = ProviderModel;
