const db = require("../helper/db_connection")
const slugify = require("slugify");

module.exports = {
    get: function(req,res) {
        return new Promise((resolve,reject) => {
            const {sortby="title", order="asc", limit=5, page=1} = req.query;
            const offset = (page - 1) * limit;
            sql = `SELECT products.name as product,
            products.cover, code, title, 
            coupon.description, valid, type,
            discount, condition_coupon
            FROM coupon
            JOIN products 
            ON coupon.product_id = products.product_id
            WHERE valid > NOW()
            ORDER BY coupon.${sortby} ${order} LIMIT ${limit} OFFSET ${offset}
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }
                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    getByCode: function(req,res) {
        return new Promise((resolve,reject) => {
            const {code} = req.params
            console.log(code)
            const sql = `SELECT products.name as product,
            products.cover, code, title, 
            coupon.description, valid, type,
            discount, condition_coupon
            FROM coupon
            JOIN products 
            ON coupon.product_id = products.product_id
            WHERE code='${code}' AND valid > NOW()
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }
                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    add: function(req,res) {
        
        return new Promise((resolve,reject) => {
            const {product_id, code, title, 
                description, valid, type, discount,
                condition_coupon
            } = req.body
            const sql = `INSERT INTO coupon (product_id, code, 
                title, description, 
                valid, type,
                discount, condition_coupon) 
                VALUES('${product_id}', '${code}',
                '${title}', '${description}', '${valid}', '${type}',
                '${discount}', '${condition_coupon}')
            `;
            console.log("ini")
            db.query(sql,(err,results) => {

                if(err) {
                    if(err.code === "ER_DUP_ENTRY") {
                        reject({
                            message: "there is already name like that",
                            status: 400
                        })
                    }
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }

                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
}