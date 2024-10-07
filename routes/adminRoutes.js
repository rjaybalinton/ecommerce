// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController'); // Updated path

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Admin Dashboard - List all products
router.get('/', productController.listProducts);

// Add Product Form
router.get('/add', productController.showAddProductForm);

// Add Product Handler
router.post('/add', upload.single('product_image'), productController.addProduct);

// Edit Product Form
router.get('/edit/:id', productController.showEditProductForm);

// Update Product Handler
router.post('/edit/:id', upload.single('product_image'), productController.updateProduct);

// Delete Product Handler
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
