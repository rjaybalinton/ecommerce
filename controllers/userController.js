const bcrypt = require('bcrypt');
const db = require('../config/db');

// Define admin credentials
const ADMIN_EMAIL = 'admin@example.com'; // Change to your desired admin email
const ADMIN_PASSWORD = 'admin123'; // Change to your desired admin password

// Render the sign-up page
exports.getSignup = (req, res) => {
    res.render('signup');
};

// Handle sign-up logic
exports.postSignup = (req, res) => {
    const { username, address, email, password } = req.body;

    // Check if the email matches the admin email
    if (email === ADMIN_EMAIL) {
        return res.send('Admin cannot sign up, please use the admin login page.'); // Prevent admin registration
    }

    // Hash the password for regular users
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        // Insert user into the database
        db.query('INSERT INTO users (username, address, email, password, role) VALUES (?, ?, ?, ?, ?)', 
            [username, address, email, hashedPassword, 'user'], 
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.send('Username or email already exists!'); // Provide feedback to user
                    }
                    throw err;
                }
                res.redirect('/login'); // Redirect to login page after successful sign-up
            }
        );
    });
};

// Render the login page
exports.getLogin = (req, res) => {
    res.render('login');
};

// Handle login logic for regular users
exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Compare password
            bcrypt.compare(password, results[0].password, (err, match) => {
                if (err) throw err;

                if (match) {
                    const role = results[0].role;
                    if (role === 'admin') {
                        res.redirect('/admin'); // Redirect to admin UI
                    } else {
                        res.redirect('/user'); // Redirect to user UI
                    }
                } else {
                    res.send('Invalid username or password!');
                }
            });
        } else {
            res.send('Invalid username or password!');
        }
    });
};

// Handle admin login logic
exports.postAdminLogin = (req, res) => {
    const { username, password } = req.body;

    // Check if the username and password match the admin credentials
    if (username === 'admin' && password === ADMIN_PASSWORD) {
        // Check if the admin already exists in the database
        db.query('SELECT * FROM users WHERE username = ?', ['admin'], (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                // If the admin does not exist, create it
                bcrypt.hash(ADMIN_PASSWORD, 10, (err, hashedPassword) => {
                    if (err) throw err;

                    db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
                        ['admin', ADMIN_EMAIL, hashedPassword, 'admin'], 
                        (err, result) => {
                            if (err) throw err;
                            console.log('Admin account created successfully.');
                            res.redirect('/admin'); // Redirect to admin UI
                        }
                    );
                });
            } else {
                res.redirect('/admin'); // Redirect to admin UI if admin already exists
            }
        });
    } else {
        res.send('Invalid admin username or password!');
    }
};

// Render the user UI
exports.getUserUI = (req, res) => {
    res.render('home'); 
};

// Render the admin UI
const Product = require('../models/Product'); // Adjust the path as needed

exports.getAdminUI = async (req, res) => {
   
    res.render('admin'); 
};
