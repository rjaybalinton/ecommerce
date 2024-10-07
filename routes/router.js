const express = require('express');
const router = express.Router();
const con = require('../controller/Ecom');

router.get('/', con.index);
router.get('/shop', con.shop);
router.get('/aboutUs', con.aboutUs);
router.get('/services', con.services);
router.get('/blog', con.blog);
router.get('/contactUs', con.contactUs);

module.exports = router;


