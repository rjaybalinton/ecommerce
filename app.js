const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userAuth');
const path = require('path');
const mysql = require('mysql2');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();

// Use express-ejs-layouts
app.use(expressLayouts);
//app.set('layout', 'layout'); // This refers to 'views/layout.ejs'

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Use routes
app.use('/', userRoutes);
//arren
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
   const product = getProductById(productId);
   res.render('productDetails', { product });
});
// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.redirect('/'); // Redirect to home or login page after logout
    });
});

// Start the server
app.listen(3300, () => {
    console.log(`Server running on http://localhost:3300`);
});
