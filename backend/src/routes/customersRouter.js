const express = require('express');
const customerController = require('../controllers/customerController');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');

const router = express.Router();

router.get('/', customerController.findAll);

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  customerController.findOne
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  customerController.create
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  customerController.update
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  customerController.delete
);

module.exports = router;
