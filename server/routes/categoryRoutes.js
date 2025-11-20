const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const apiKeyAuth = require('../middleware/auth');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes (require API key)
router.post('/', apiKeyAuth, createCategory);
router.put('/:id', apiKeyAuth, updateCategory);
router.delete('/:id', apiKeyAuth, deleteCategory);

module.exports = router;

