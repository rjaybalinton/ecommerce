const db = require('../config/db');

// Display the admin login page
exports.getAdminLogin = (req, res) => {
    res.render('adminLogin');
};

// Handle admin login
exports.postAdminLogin = (req, res) => {
    const { email, password } = req.body;

    // Check if admin exists
    db.query('SELECT * FROM admins WHERE email = ? AND password = ?', 
    [email, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.send('Admin login successful! Welcome, ' + results[0].username);
        } else {
            res.send('Invalid admin email or password!');
        }
    });
};
