const db = require('../config/db');
const { getAllProducts, getProducts } = require('../controller/econtroller');

const productMan = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            const query = "select * from product";
            db.query(query,(err, result) => {
                if(err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    }
};

module.exports = productMan;