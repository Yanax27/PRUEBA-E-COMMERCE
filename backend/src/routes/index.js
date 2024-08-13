const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const userController = require('./usersRouter');
const customerController = require('./customersRouter');
const orderController = require('../controllers/orderController');

function routerApi(app){
const router = express.Router();
app.use('/api/v1', router );
 router.use('/products', productsRouter);
 router.use('/users', usersRouter);
 router.use('/categories', categoriesRouter);
 router.use('./users', userController);
 router.use('./customers', customerController);
 router.use('./orders', orderController);


}

module.exports = routerApi;
