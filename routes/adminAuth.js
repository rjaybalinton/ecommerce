const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Display the admin login page
router.get('/login', adminController.getAdminLogin);

// Handle admin login form submission
router.post('/login', adminController.postAdminLogin);

module.exports = router;
