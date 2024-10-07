// models/Product.js
const db = require('../db');

class Product {
    // Retrieve all products
    static getAll(callback) {
        const query = 'SELECT * FROM product';
        db.query(query, callback);
    }

    // Retrieve a product by ID
    static getById(id, callback) {
        const query = 'SELECT * FROM product WHERE product_id = ?';
        db.query(query, [id], callback);
    }

    // Create a new product
    static create(data, callback) {
        const query = 'INSERT INTO product (product_name, product_description, product_price, quantity, category, product_image) VALUES (?, ?, ?, ?, ?, ?)';
        const { product_name, product_description, product_price, quantity, category, product_image } = data;
        db.query(query, [product_name, product_description, product_price, quantity, category, product_image], callback);
    }

    // Update an existing product
    static update(id, data, callback) {
        const query = 'UPDATE product SET product_name = ?, product_description = ?, product_price = ?, quantity = ?, category = ?, product_image = ? WHERE product_id = ?';
        const { product_name, product_description, product_price, quantity, category, product_image } = data;
        db.query(query, [product_name, product_description, product_price, quantity, category, product_image, id], callback);
    }

    // Delete a product
    static delete(id, callback) {
        const query = 'DELETE FROM product WHERE product_id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Product;
