const db = require("../helper/db_connection");

module.exports = {
    get: function(req,res) {
        return new Promise((resolve, reject) => {
            const {productId, size} = req.query;
            const sql = `SELECT * FROM product_size 
            WHERE product_id=${productId} AND size="${size}"`

            db.query(sql, (err, results) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                } else if(results.length === 0) {
                    reject({
                        message: "data tidak ada",
                        status: 400,
                        data: []
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: results
                    })
                }
                
            })
        })
    },
    add: function(req, res) {
        return new Promise((resolve, reject) => {
            const {product_id, size, price} = req.body;
            const sql = `INSERT INTO product_size(product_id, size, price) 
            VALUES("${product_id}", "${size}", "${price}")`
            db.query(sql, (err, result) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                } else {
                    resolve({
                        message: "Success Added",
                        status: 200,
                        data: result
                    })
                }

            })
        })
    } 
}