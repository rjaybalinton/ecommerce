const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const mainRoutes = require('./router'); // Import routes from router.js
const additionalRoutes = require('./route'); // Import routes from route.js
const adminRoutes = require('./adminRoutes'); // Import routes from adminRoutes.js

// Use routes from router.js
router.use('/', mainRoutes); // This will use the routes defined in router.js
// Use routes from route.js
router.use('/', additionalRoutes); // This will use the routes defined in route.js
// Use routes from adminRoutes.js
router.use('/admin', adminRoutes); // This will use the routes defined in adminRoutes.js

// User sign-up routes
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);

// User login routes
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);// Admin UI already used in admin routes
router.post('/admin/login', userController.postAdminLogin); // Admin login post route

// Admin and User UI routes
router.get('/user', userController.getUserUI);
router.get('/admin', userController.getAdminUI);
// Admin login post route
//router.post('/admin/login', userController.postAdminLogin);



// Define root route
router.get('/', (req, res) => {
    res.render('index'); // Make sure index.ejs exists

});

router.get('/admin/login', (req, res) => {
    res.render('adminLogin'); // Render admin login page
});

module.exports = router;

