const productMan = require('../models/productMan');

const main = {
    getAllProducts: (req, res) => {
        Promise.all([
            productMan.getAllProducts(),
        ]).then(([productList]) => {
            res.render('product', {
                products:productList
            });
        }).catch(err => {
            throw err
        })
        
    },
    product: (req, res) => {
        res.render('product');
    },
    
};

module.exports = main;
