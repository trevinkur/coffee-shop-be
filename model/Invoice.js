const db = require("../helper/db_connection")
const slugify = require("slugify");
const fs = require("fs");

module.exports = {
    getByUser: function(req,res) {
        return new Promise((resolve,reject) => {
            const {sortby="create_at", order="desc", limit=5, page=1,} = req.query;
            const {user_id} = req.params
            const offset = (page - 1) * limit;
            console.log(user_id)
            sql = `SELECT users.display_name AS name, 
            products.name as product, product_size.size, 
            total_payment, coupon.discount, delivery.place,
            delivery.type, 
            invoice.status, payment_method, 
            from invoice
            JOIN users 
            ON invoice.user_id = users.user_id
            JOIN products
            ON invoice.product_id = products.product_id
            JOIN product_size
            ON invoice.product_id = product_size.product_id AND invoice.size = product_size.size
            JOIN delivery
            ON invoice.delivery_id = delivery.delivery_id
            JOIN coupon
            ON invoice.coupon_code = coupon.coupon_code
            WHERE users.user_id = ${user_id}
            GROUP BY product_size.product_id, product_size.size
            ORDER BY products.${sortby} ${order} LIMIT ${limit} OFFSET ${offset}
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
                        data: results
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
            console.log(req.body)
            const {product_id, user_id, size, delivery, coupon_code, payment_method, total_payment} = req.body
            const sql = `INSERT INTO invoice (product_id, user_id, size, delivery,
                 coupon, payment_method, total_payment) 
                VALUES('${product_id}', ${user_id}, "${size}", "${delivery}","${coupon_code}", "${payment_method}", ${total_payment} )
            `;
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
    update: function(req,res) {
        return new Promise((resolve,reject) => {
            const {payment_method, status} = req.body
            const {productId, userId} = req.query
            const sql = `UPDATE invoice SET payment_method="${payment_method}",
            status="${status}" WHERE user_id=${userId} ${ productId ? `AND product_id=${productId}`: ''}  
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    fs.unlink(`./public/${req.file.filename}`,(err,results) => {})
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