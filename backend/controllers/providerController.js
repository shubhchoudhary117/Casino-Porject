const providerModel = require('../models/provider');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Create a new record
let codeCount = 1;
const createProviderRecord = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      reference: Joi.string().required(),
      password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$')).required(),
      contactNo: Joi.string().min(10).max(11).regex(/^\d+$/).required(),
      currentLimit:Joi.number().required(),
      share: Joi.number().required(),
      cShare: Joi.number().required(),
      icShare: Joi.number().required(),
      mobileShare: Joi.number().required(),
      mc: Joi.number().required(),
      sc: Joi.number().required(),
      cc: Joi.number().required(),
      casinoCheck: Joi.boolean().required(),
      icCheck: Joi.boolean().required(),
      cshare: Joi.number().required(),
    })
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const code = `P${codeCount}`;
    codeCount++;
    req.body.code = code;
    const newRecord = new providerModel(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getProvider = async (req,res)=>{

    try {
      const providers = await providerModel.find({}); // Exclude the 'password' field
      res.json(providers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}
module.exports = {
  createProviderRecord,getProvider
};
