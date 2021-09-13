const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get category by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getCategory(req, res, next) {
  const category = await db.Category.findByPk(req.params.id);

  if (!category) {
    next(new NotFound('Category not found'));
    return;
  }
  res.json(category);
}

getCategory.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = getCategory;
