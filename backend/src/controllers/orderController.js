const { Order } = require('../db');
const boom = require('@hapi/boom');

const orderController = {
  async create(req, res, next) {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(boom.badRequest(error.message));
    }
  },

  async findAll(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      next(boom.badImplementation(error.message));
    }
  },

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        throw boom.notFound('Order not found');
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Order.update(req.body, {
        where: { id },
        returning: true,
      });

      if (!updated) {
        throw boom.notFound('Order not found');
      }

      const updatedOrder = await Order.findByPk(id);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Order.destroy({
        where: { id },
      });

      if (!deleted) {
        throw boom.notFound('Order not found');
      }

      res.json({ id });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
