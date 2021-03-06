const { Op } = require('sequelize');
const db = require('../../models');

/**
 * Get all products
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 */
async function getProducts(req, res) {
  res.json(
    await db.Product.findAll({
      where: {
        publishedAt: {
          [Op.lt]: Date.now(),
        },
      },
    }),
  );
}

module.exports = getProducts;
