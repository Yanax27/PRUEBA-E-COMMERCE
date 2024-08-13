const { Category } = require('../db');
const boom = require('@hapi/boom');

const categoryController = {

  async create(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(boom.badRequest(error.message));
    }
  },

  async findAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      next(boom.badImplementation(error.message));
    }
  },

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        throw boom.notFound('Category not found');
      }

      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Category.update(req.body, {
        where: { id },
        returning: true,
      });

      if (!updated) {
        throw boom.notFound('Category not found');
      }

      const updatedCategory = await Category.findByPk(id);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Category.destroy({
        where: { id },
      });

      if (!deleted) {
        throw boom.notFound('Category not found');
      }

      res.json({ id });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
