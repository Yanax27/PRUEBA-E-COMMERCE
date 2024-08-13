const { User } = require('../db');
const boom = require('@hapi/boom');

const userController = {
  async create(req, res, next) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(boom.badRequest(error.message));
    }
  },

  async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(boom.badImplementation(error.message));
    }
  },

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        throw boom.notFound('User not found');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await User.update(req.body, {
        where: { id },
        returning: true,
      });

      if (!updated) {
        throw boom.notFound('User not found');
      }

      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({
        where: { id },
      });

      if (!deleted) {
        throw boom.notFound('User not found');
      }

      res.json({ id });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
