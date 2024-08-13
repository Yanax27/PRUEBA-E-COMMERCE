const { Customer } = require('../db');
const boom = require('@hapi/boom');

const customerController = {
  async create(req, res, next) {
    try {
      const newCustomer = await Customer.create(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(boom.badRequest(error.message));
    }
  },

  async findAll(req, res, next) {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      next(boom.badImplementation(error.message));
    }
  },

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);

      if (!customer) {
        throw boom.notFound('Customer not found');
      }

      res.json(customer);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Customer.update(req.body, {
        where: { id },
        returning: true,
      });

      if (!updated) {
        throw boom.notFound('Customer not found');
      }

      const updatedCustomer = await Customer.findByPk(id);
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Customer.destroy({
        where: { id },
      });

      if (!deleted) {
        throw boom.notFound('Customer not found');
      }

      res.json({ id });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = customerController;
