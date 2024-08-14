const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(30);
const phone =  Joi.string();
const userId = Joi.string();


const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  user: Joi.object({

  })
});

const updateCustomerSchema = Joi.object({
  name,
  phone,
  userId
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
