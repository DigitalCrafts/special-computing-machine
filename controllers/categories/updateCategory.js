const { body, param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Update Products
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next next function
 */
async function updateCategory(req, res, next) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);

  if (!category) {
    next(new NotFound('Category not found'));
    return;
  }

  // get only valid properties from Category model
  const updatedValues = {};
  Object.keys(db.Category.rawAttributes).forEach((propName) => {
    if (req.body[propName] !== null || req.body[propName] !== undefined) {
      updatedValues[propName] = req.body[propName];
    }
  });

  const parent = await db.Category.findByPk(req.body.parentId);
  if (parent) {
    category.setParent(parent);
  }

  await category.update(updatedValues);
  res.status(200).json(category);
}

updateCategory.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  body('name')
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('enabled')
    .isBoolean()
    .withMessage('must be true or false')
    .trim()
    .escape(),
  validate,
];

module.exports = updateCategory;
