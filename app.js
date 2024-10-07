const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./routes/route');
const path = require('path');
const { getProduct } = require('./controller/econtroller');
const { getSongById } = require('./models/productMan');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = getProductById(productId);
    res.render('productDetails', { product });
});

app.listen(3000, () => {
    console.log('server running in http://localhost:3000');
});