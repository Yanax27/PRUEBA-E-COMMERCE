const express = require('express');
const categoryController = require('../controllers/categoryController');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categorySchema');

const router = express.Router();

router.get('/', categoryController.findAll);

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  categoryController.findOne
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  categoryController.create
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  categoryController.update
);

router.delete('/:id', categoryController.delete);

module.exports = router;
