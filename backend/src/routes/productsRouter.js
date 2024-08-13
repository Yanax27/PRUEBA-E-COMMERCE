const express = require('express');
const productController = require('../controllers/ProductController'); // Cambié el import al nuevo controlador
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  productController.findOne
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  productController.create
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  productController.update
);

router.delete('/:id', productController.delete);

module.exports = router;
