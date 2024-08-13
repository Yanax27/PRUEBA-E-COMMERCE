const { Product } = require('../db'); // Asegúrate de importar tu modelo Product
const boom = require('@hapi/boom');

const productController = {
  // Crear un nuevo producto
  async create(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(boom.badRequest(error.message));
    }
  },

  // Obtener todos los productos
  async findAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      next(boom.badImplementation(error.message));
    }
  },

  // Obtener un producto por ID
  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        throw boom.notFound('Product not found');
      }

      if (product.isBlocked) {
        throw boom.conflict('Product is blocked');
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  // Actualizar un producto por ID
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Product.update(req.body, {
        where: { id },
        returning: true,
      });

      if (!updated) {
        throw boom.notFound('Product not found');
      }

      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  // Eliminar un producto por ID
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({
        where: { id },
      });

      if (!deleted) {
        throw boom.notFound('Product not found');
      }

      res.json({ id });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
