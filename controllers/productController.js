// controllers/productController.js
const Product = require('../models/Product');

// List all products
const listProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Server Error');
        }
        res.render('admin', { product: results });
    });
};

// Show form to add a new product
const showAddProductForm = (req, res) => {
    res.render('add_product');
};

// Handle adding a new product
const addProduct = (req, res) => {
    const { product_name, product_description, product_price, quantity, category } = req.body;
    const product_image = req.file ? req.file.filename : null;

    // Validation
    if (!product_name || !product_price || !quantity || !category) {
        return res.status(400).send('Please fill in all required fields.');
    }

    const newProduct = {
        product_name,
        product_description,
        product_price,
        quantity,
        category,
        product_image
    };

    Product.create(newProduct, (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).send('Failed to add product. Please try again.');
        }
        res.redirect('/admin');
    });
};

// Show form to edit an existing product
const showEditProductForm = (req, res) => {
    const product_id = req.params.id;
    Product.getById(product_id, (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send('Server Error');
        }
        if (results.length === 0) {
            return res.redirect('/admin');
        }
        res.render('edit_product', { product: results[0] });
    });
};

// Handle updating an existing product
const updateProduct = (req, res) => {
    const product_id = req.params.id;
    const { product_name, product_description, product_price, quantity, category } = req.body;
    let product_image = req.body.existing_image;

    if (req.file) {
        product_image = req.file.filename;
    }

    // Validation
    if (!product_name || !product_price || !quantity || !category) {
        return res.status(400).send('Please fill in all required fields.');
    }

    const updatedProduct = {
        product_name,
        product_description,
        product_price,
        quantity,
        category,
        product_image
    };

    Product.update(product_id, updatedProduct, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/admin');
    });
};

// Handle deleting a product
const deleteProduct = (req, res) => {
    const product_id = req.params.id;
    Product.delete(product_id, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/admin');
    });
};

module.exports = {
    listProducts,
    showAddProductForm,
    addProduct,
    showEditProductForm,
    updateProduct,
    deleteProduct
};
