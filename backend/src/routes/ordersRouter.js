const express = require('express');
const orderController = require('../controllers/orderController');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/orderSchema');

const router = express.Router();

router.get('/', orderController.findAll);

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  orderController.findOne
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  orderController.create
);

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  orderController.update
);

router.delete('/:id', orderController.delete);

module.exports = router;
