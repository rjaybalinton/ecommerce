const express = require('express');
const multer = require('multer');
const router = express.Router();
const main = require('../controller/econtroller');
const path = require('path');

const storage = multer.diskStorage ( {
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

router.get('/product', main.getAllProducts);

module.exports = router;

