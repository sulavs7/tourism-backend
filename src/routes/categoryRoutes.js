const express = require('express');
const { createCategory, getCategories } = require('../controllers/categoryController');
const { auth, checkRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, checkRole(['local']), createCategory);
router.get('/', getCategories);

module.exports = router;