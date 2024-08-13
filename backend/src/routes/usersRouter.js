const express = require('express');
const userController = require('../controllers/UserController');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');

const router = express.Router();

router.get('/', userController.findAll);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  userController.findOne
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  userController.create
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  userController.update
);

router.delete('/:id', userController.delete);

module.exports = router;
